const mongoose = require('mongoose');
const HostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: String
}, { timestamps: true });
module.exports = mongoose.model('Host', HostSchema);
