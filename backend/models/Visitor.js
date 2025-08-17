const mongoose = require('mongoose');
const VisitorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  company: String,
  photoUrl: String,
  govIdHash: String,
  watchlistFlag: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Visitor', VisitorSchema);
