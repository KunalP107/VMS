const Zone = require('../models/Zone');
exports.createZone = async (req, res) => res.status(201).json(await Zone.create(req.body));
exports.listZones = async (_req, res) => res.json(await Zone.find().sort({ name: 1 }));
exports.getZone = async (req, res) => {
  const z = await Zone.findById(req.params.id);
  if (!z) return res.status(404).json({ msg: 'Not found' });
  res.json(z);
};
exports.updateZone = async (req, res) => res.json(await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deleteZone = async (req, res) => { await Zone.findByIdAndDelete(req.params.id); res.json({ ok: true }); };
exports.getZoneByName = async (req, res) => {
  const z = await Zone.findOne({ name: req.params.name });
  if (!z) return res.status(404).json({ msg: 'Not found' });
  res.json(z);
};