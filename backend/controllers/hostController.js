const Host = require('../models/Host');
exports.createHost = async (req, res) => res.status(201).json(await Host.create(req.body));
exports.listHosts = async (_req, res) => res.json(await Host.find().sort({ name: 1 }));
exports.getHost = async (req, res) => {
  const h = await Host.findById(req.params.id);
  if (!h) return res.status(404).json({ msg: 'Not found' });
  res.json(h);
};
exports.updateHost = async (req, res) => res.json(await Host.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deleteHost = async (req, res) => { await Host.findByIdAndDelete(req.params.id); res.json({ ok: true }); };
exports.getHostByName = async (req, res) => {
  const h = await Host.findOne({ name: req.params.name });
  if (!h) return res.status(404).json({ msg: 'Not found' });
  res.json(h);
};
