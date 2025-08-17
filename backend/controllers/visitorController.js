const Visitor = require('../models/visitor');

exports.createVisitor = async (req, res) => res.status(201).json(await Visitor.create(req.body));
exports.listVisitors = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { fullName: { $regex: q, $options: 'i' } } : {};
  res.json(await Visitor.find(filter).sort({ createdAt: -1 }));
};
exports.getVisitor = async (req, res) => {
  const v = await Visitor.findById(req.params.id);
  if (!v) return res.status(404).json({ msg: 'Not found' });
  res.json(v);
};
exports.updateVisitor = async (req, res) => res.json(await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true }));
exports.deleteVisitor = async (req, res) => { await Visitor.findByIdAndDelete(req.params.id); res.json({ ok: true }); };
