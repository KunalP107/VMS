const mongoose = require('mongoose');
const WatchlistEntrySchema = new mongoose.Schema({
  nameHash: { type: String, index: true },
  reason: String,
  createdBy: String
}, { timestamps: true });
module.exports = mongoose.model('WatchlistEntry', WatchlistEntrySchema);
