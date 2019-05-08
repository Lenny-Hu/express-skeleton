const { createLogger, format, config } = require('winston');
const { combine, timestamp, printf, json } = format;
const Transport = require('winston-transport');

const SysLog = require('./db/syslog');

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`;
});

class MongooseTransport extends Transport {
  constructor (opts) {
    super(opts);
  }

  log(info, callback) {
    console.log('在这儿保存日志', info);
    SysLog.add({
      level: config.syslog.levels[info.level],
      message: info.message,
      rawoutput: info[Symbol('message')]
    });

    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service
    callback();
  }
};

const transport = new MongooseTransport();
// transport.on('logged', (info) => {
//   // Verification that log was called on your transport
//   console.log(`Logging! It's happening!`, info);
// });

const logger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    json(),
    timestamp(),
    myFormat
  ),
  transports: [transport]
});

module.exports = logger;
