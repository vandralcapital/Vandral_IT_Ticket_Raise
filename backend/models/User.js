const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'employee' },
  skills:   { type: [String], default: [] },
  openTickets: [
    {
      ticketId: { type: String },
      etaHours: { type: Number }
    }
  ],
  lastAssignedAt: { type: Date }
});

module.exports = mongoose.model('User', userSchema); 