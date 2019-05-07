const mongoose = require('mongoose');

require('./userSchema');

module.exports = {
  async connect (config) {
    let uri = `mongodb://`;
    if (config.user && config.pass) {
      uri += `${config.user}:${config.pass}@`;
    }
    uri += `${config.host}:${config.port}/${config.name}`;

    let result = await mongoose.connect(uri, (error) => {
      console.log(error ? '连接数据库失败' : '连接数据库成功')
    })

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongodb connection error:'));
    db.once('open', function() {
      console.log('第一次打开')
    });

    return result
  }
}
