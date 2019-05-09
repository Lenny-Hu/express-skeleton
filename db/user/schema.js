const mongoose = require('mongoose');
const REGEXP = require('../../lib/regexp');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, '用户名是必填字段'],
    minlength: [2, '用户名长度至少2位'],
    maxlength: [16, '用户名长度最大16位'],
    validate: {
      validator (v) {
        return REGEXP.username.pattern.test(v);
      },
      message: `{VALUE}: ${REGEXP.username.error}!`
    }
  },
  password: {
    type: String,
    required: [true, '密码是必填字段']
    // 密码存储的是md5值，此处不做校验
    // validate: {
    //   validator (v) {
    //     return REGEXP.password.pattern.test(v);
    //   },
    //   message: `{VALUE}: ${REGEXP.password.error}!`
    // }
  },
  phone: {
    type: String,
    validate: {
      validator (v) {
        return REGEXP.phone.pattern.test(v);
      },
      message: `{VALUE}: ${REGEXP.phone.error}!`
    },
    required: [true, '手机号码是必填字段']
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const User = mongoose.model('user', userSchema);

module.exports = User;
