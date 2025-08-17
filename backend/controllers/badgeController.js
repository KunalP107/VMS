const Badge = require('../models/Badge');
exports.getBadge = async (req, res) => {
  const b = await Badge.findById(req.params.id).populate('zones');
  if (!b) return res.status(404).json({ msg: 'Not found' });
  res.json(b);
};
exports.activate = async (req, res) => res.json(await Badge.findByIdAndUpdate(req.params.id, { active: true }, { new: true }));
exports.deactivate = async (req, res) => res.json(await Badge.findByIdAndUpdate(req.params.id, { active: false }, { new: true }));
