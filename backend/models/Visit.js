const mongoose = require('mongoose');
const VisitSchema = new mongoose.Schema({
  visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  host:    { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
  purpose: String,
  scheduledStart: Date,
  scheduledEnd: Date,
  checkIn: Date,
  checkOut: Date,
  status: { type: String, enum: ['scheduled','checked_in','checked_out','cancelled'], default: 'scheduled' },
  badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }
}, { timestamps: true });
module.exports = mongoose.model('Visit', VisitSchema);
