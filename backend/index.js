require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Root route
app.get('/', (req, res) => {
  res.type('text').send('Backend server is running!');
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Signup
app.post('/signup', async (req, res) => {
  const { username, email, password, role, skills } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    // Default role to 'employee' if not provided or invalid
    const userRole = (role === 'ithead') ? 'ithead' : 'employee';
    const user = await User.create({
      username,
      email,
      password: hash,
      role: userRole,
      skills: userRole === 'ithead' ? (skills || []) : []
    });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'SECRET_KEY');
  res.json({ token, role: user.role });
});

// Auth middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// /me endpoint
app.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Create a new ticket
app.post('/tickets', auth, async (req, res) => {
  const { ticketType, remarks, skillRequired, difficulty } = req.body;
  try {
    // Find the max ticketId number
    const lastTicket = await Ticket.findOne({}).sort({ dateRaised: -1 });
    let nextId = 1;
    if (lastTicket && lastTicket.ticketId && lastTicket.ticketId.startsWith('#TID-')) {
      const num = parseInt(lastTicket.ticketId.replace('#TID-', ''));
      if (!isNaN(num)) nextId = num + 1;
    }
    // Get user info
    const user = await User.findById(req.user.id);

    // --- Assignment Algorithm Start ---
    // 1. Find all IT Heads with the required skill
    let agents = await User.find({ role: 'ithead', skills: { $in: [skillRequired] } });
    if (!agents.length) {
      return res.status(400).json({ error: 'No suitable agent found for this skill' });
    }
    // Overload protection: filter out agents with >8 pending hours
    agents = agents.filter(agent => {
      const pendingHours = (agent.openTickets || []).reduce((sum, t) => sum + (t.etaHours || 0), 0);
      return pendingHours <= 8;
    });
    if (!agents.length) {
      return res.status(400).json({ error: 'All suitable agents are overloaded (pending hours > 8) for this skill' });
    }
    // 2. Sort agents by lastAssignedAt (oldest/nulls first), then by workload Round Robin
    agents.sort((a, b) => {
      // Sort by lastAssignedAt (nulls first)
      const aTime = a.lastAssignedAt ? new Date(a.lastAssignedAt).getTime() : 0;
      const bTime = b.lastAssignedAt ? new Date(b.lastAssignedAt).getTime() : 0;
      if (aTime !== bTime) return aTime - bTime;
      // If lastAssignedAt is the same, sort by workload
      const aWorkload = (a.openTickets || []).reduce((sum, t) => sum + (t.etaHours || 0), 0);
      const bWorkload = (b.openTickets || []).reduce((sum, t) => sum + (t.etaHours || 0), 0);
      return aWorkload - bWorkload;
    });
    // 3. Select the first agent in the sorted list
    let selectedAgent = agents[0];
    let minWorkload = (selectedAgent.openTickets || []).reduce((sum, t) => sum + (t.etaHours || 0), 0);
    // 4. Assign ticket fields
    let etaHours = 1;
    if (difficulty === 'Medium') etaHours = 2;
    else if (difficulty === 'Hard') etaHours = 4;
    const ETA = minWorkload + etaHours;
    // 5. Create ticket with assignment
    const ticket = await Ticket.create({
      userId: req.user.id,
      username: user.username,
      email: user.email,
      ticketType,
      skillRequired,
      difficulty,
      assignedTo: selectedAgent._id,
      etaHours,
      ETA,
      remarks,
      status: 'In Process',
      dateRaised: new Date(),
      ticketId: `#TID-${nextId}`,
    });
    // 6. Update agent's openTickets and lastAssignedAt
    selectedAgent.openTickets.push({ ticketId: ticket.ticketId, etaHours });
    selectedAgent.lastAssignedAt = new Date();
    await selectedAgent.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: 'Could not create ticket' });
  }
});

// Get all tickets for the logged-in user (or all if ithead)
app.get('/tickets', auth, async (req, res) => {
  try {
    let tickets;
    const statusFilter = req.query.status;
    const baseQuery = req.user.role === 'ithead' ? { assignedTo: req.user.id } : { userId: req.user.id };
    const query = statusFilter ? { ...baseQuery, status: statusFilter } : baseQuery;
    if (req.user.role === 'ithead') {
      tickets = await Ticket.find(query).sort({ dateRaised: -1 });
    } else {
      tickets = await Ticket.find(query).populate('assignedTo', 'username email').sort({ dateRaised: -1 });
    }
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ error: 'Could not fetch tickets' });
  }
});

// IT Head: Update ticket status (resolve ticket)
app.patch('/tickets/:ticketId/status', auth, async (req, res) => {
  if (req.user.role !== 'ithead') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { ticketId } = req.params;
  const { status, expectedFix } = req.body;
  try {
    let newExpectedFix = expectedFix;
    if (expectedFix) {
      const date = new Date(expectedFix);
      date.setDate(date.getDate() + 2); // Add 2 days
      newExpectedFix = date;
    }
    const ticket = await Ticket.findOneAndUpdate(
      { ticketId },
      { status, expectedFix: newExpectedFix, lastUpdatedBy: req.user.username },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: 'Could not update ticket' });
  }
});

// Ticket conversation: get all messages
app.get('/tickets/:ticketId/messages', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    // Only allow assigned IT Head or ticket owner
    if (
      req.user.role !== 'ithead' &&
      (!ticket.userId || ticket.userId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(ticket.messages || []);
  } catch (err) {
    res.status(400).json({ error: 'Could not fetch messages' });
  }
});

// Ticket conversation: post a new message (with optional image)
app.post('/tickets/:ticketId/messages', auth, upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  if (!text && !imageUrl) return res.status(400).json({ error: 'Message required' });
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    // Only allow assigned IT Head or ticket owner
    if (
      req.user.role !== 'ithead' &&
      (!ticket.userId || ticket.userId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const sender = req.user.role === 'ithead' ? 'ithead' : 'employee';
    const message = {
      sender,
      text,
      imageUrl,
      timestamp: new Date()
    };
    ticket.messages.push(message);
    await ticket.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Could not add message' });
  }
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Catch-all error handler for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
}); 