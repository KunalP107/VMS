const crypto = require('crypto');
const WatchlistEntry = require('../models/WatchListEntry');
const Visitor = require('../models/visitor');

const sha = (s) => crypto.createHash('sha256').update((s || '').toLowerCase().trim()).digest('hex');

async function matchVisitor(visitor) {
  const hit = await WatchlistEntry.findOne({ nameHash: sha(visitor.fullName) });
  if (hit) {
    await Visitor.updateOne({ _id: visitor._id }, { $set: { watchlistFlag: true } });
    return { alert: true, reason: hit.reason };
  }
  return { alert: false };
}

module.exports = { matchVisitor, sha };
