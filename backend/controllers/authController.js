const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (u) => jwt.sign({ id: u._id, email: u.email, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'Email already registered' });
  const u = await User.create({ name, email, password, role });
  res.status(201).json({ token: sign(u) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await u.compare(password))) return res.status(401).json({ msg: 'Invalid credentials' });
  res.json({ token: sign(u) });
};

exports.me = async (req, res) => {
  const u = await User.findById(req.user.id).select('-password');
  res.json(u);
};
