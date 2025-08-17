const Visit = require('../models/Visit');
exports.onsite = async (_req, res) => {
  const count = await Visit.countDocuments({ status: 'checked_in' });
  res.json({ onsite: count });
};
