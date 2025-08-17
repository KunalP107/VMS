const Visit = require('../models/Visit');
const Badge = require('../models/Badge');
const { matchVisitor } = require('../utils/matchWatchlist');

exports.createVisit = async (req, res) => res.status(201).json(await Visit.create(req.body));

exports.listVisits = async (req, res) => {
  const { status, from, to } = req.query;
  const q = {};
  if (status) q.status = status;
  if (from || to) q.createdAt = { ...(from && { $gte: new Date(from) }), ...(to && { $lte: new Date(to) }) };
  res.json(await Visit.find(q).populate('visitor host badge').sort({ createdAt: -1 }));
};

exports.getVisit = async (req, res) => {
  const v = await Visit.findById(req.params.id).populate('visitor host badge');
  if (!v) return res.status(404).json({ msg: 'Not found' });
  res.json(v);
};

exports.updateVisit = async (req, res) => res.json(await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true }));

exports.checkIn = async (req, res) => {
  const v = await Visit.findById(req.params.id).populate('visitor');
  if (!v || v.status !== 'scheduled') return res.status(400).json({ msg: 'Invalid visit' });
  const badge = await Badge.create({ code: `B-${Date.now()}`, zones: req.body.zoneIds || [], printedAt: new Date(), active: true });
  v.badge = badge._id; v.checkIn = new Date(); v.status = 'checked_in';
  await v.save();
  const { alert, reason } = await matchVisitor(v.visitor);
  const populated = await v.populate('badge');
  res.json({ visit: populated, badge, alert, reason });
};

exports.checkOut = async (req, res) => {
  const v = await Visit.findById(req.params.id).populate('badge');
  if (!v || v.status !== 'checked_in') return res.status(400).json({ msg: 'Invalid visit' });
  v.checkOut = new Date(); v.status = 'checked_out';
  if (v.badge) { v.badge.active = false; await v.badge.save(); }
  await v.save();
  res.json(v);
};

exports.deleteVisit = async (req, res) => { await Visit.findByIdAndDelete(req.params.id); res.json({ ok: true }); };
