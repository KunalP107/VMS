const { sha } = require('../utils/matchWatchlist');
const WatchlistEntry = require('../models/WatchListEntry');

exports.addEntry = async (req, res) => {
  const { name, reason } = req.body;
  const entry = await WatchlistEntry.create({ nameHash: sha(name), reason, createdBy: req.user?.email });
  res.status(201).json(entry);
};
exports.listEntries = async (_req, res) => res.json(await WatchlistEntry.find().sort({ createdAt: -1 }));
exports.removeEntry = async (req, res) => { await WatchlistEntry.findByIdAndDelete(req.params.id); res.json({ ok: true }); };
