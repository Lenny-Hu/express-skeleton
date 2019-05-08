const mongoose = require('mongoose');

require('./user/schema');
require('./syslog/schema');

module.exports = {
  async connect (config) {
    let uri = `mongodb://`;
    if (config.user && config.pass) {
      uri += `${config.user}:${config.pass}@`;
    }
    uri += `${config.host}:${config.port}/${config.name}`;

    try {
      let db = mongoose.connection;
      db.on('error', console.error.bind(console, 'mongodb connection error:'));
      db.on('open', function () {
        console.log('打开数据库成功');
      });
      let result = await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
