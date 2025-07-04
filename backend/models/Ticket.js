const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  ticketType: { type: String, required: true },
  skillRequired: { type: String }, // e.g., Networking, Software
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // agent ID
  etaHours: { type: Number },
  ETA: { type: Number }, // total estimated time to resolve (in hours)
  remarks: { type: String },
  status: { type: String, default: 'In Process' },
  dateRaised: { type: Date, default: Date.now },
  expectedFix: { type: Date },
  ticketId: { type: String, default: '' }, // can be blank if not assigned
  lastUpdatedBy: { type: String }, // username of last IT Head who updated
  messages: [
    {
      sender: String, // 'employee', 'ithead', or userId/email/username
      text: String,
      imageUrl: String, // optional
      timestamp: { type: Date, default: Date.now }
    }
  ],
});

module.exports = mongoose.model('Ticket', ticketSchema); 