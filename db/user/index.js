const userModel = require('./schema');

module.exports = {
  async add (params) {
    try {
      let user = await userModel.create(params);
      console.log('创建成功', user);
      return Promise.resolve(user);
    } catch (error) {
      console.log('发生错误', error);
      return Promise.reject(error);
    }
  }
}
