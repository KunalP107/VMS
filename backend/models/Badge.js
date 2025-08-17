const mongoose = require('mongoose');
const BadgeSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  zones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }],
  printedAt: Date,
  active: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Badge', BadgeSchema);
