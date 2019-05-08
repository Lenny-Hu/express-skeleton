const syslogModel = require('./schema');

module.exports = {
  async add (params) {
    try {
      let log = await syslogModel.create(params);
      return Promise.resolve(log);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
