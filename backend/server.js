// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* ---------- Middleware ---------- */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

/* ---------- DB + Server ---------- */
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is not set in .env');
    await mongoose.connect(MONGO_URI, { autoIndex: true });
    console.log('✅ MongoDB connected');
    app.get('/', (req, res) => {
      res.send('Welcome to the Visitor Management System API');
    });

    /* ---------- Routes ---------- */

    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/visitors', require('./routes/visitorRoutes'));
    app.use('/api/hosts', require('./routes/hostRoutes'));
    app.use('/api/zones', require('./routes/zoneRoutes'));
    app.use('/api/watchlist', require('./routes/watchlistRoutes'));
    app.use('/api/badges', require('./routes/badgeRoutes'));
    app.use('/api/visits', require('./routes/visitRoutes'));
    app.use('/api/reports', require('./routes/reportRoutes'));


    app.listen(PORT, () => {
      console.log(`🚀 API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server start error:', err.message);
    process.exit(1);
  }
}

start();

module.exports = app; // for testing if needed
