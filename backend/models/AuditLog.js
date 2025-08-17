const mongoose = require('mongoose');
const AuditLogSchema = new mongoose.Schema({
  actorUser: String,
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  meta: {},
  at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('AuditLog', AuditLogSchema);
