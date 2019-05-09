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
  rawoutput: String,
  clientIP: String,
  path: String,
  timestamp: String,
  file: String,
  line: String,
  pos: String,
  method: String,
  stack: String,
  userAgent: String,
  originalUrl: String,
  reqMethod: {
    type: String,
    enum: ['GET', 'POST', 'DELETE', 'PUT']
  },
  reqParams: String,
  other: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const SysLog = mongoose.model('syslog', syslogSchema);

module.exports = SysLog;
