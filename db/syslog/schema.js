const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const syslogSchema = new mongoose.Schema({
  level: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7],
    default: 6,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  clientIP: String,
  path: String,
  other: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const SysLog = mongoose.model('log', syslogSchema);

module.exports = SysLog;
