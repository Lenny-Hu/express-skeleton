var express = require('express');
var router = express.Router();

const User = require('../db/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', async (req, res, next) => {
  try {
    let user = await User.add({ username: 'admin', password: '123456' })
    res.send(`创建的用户：${user}`);
  } catch (error) {
    res.status(500).send(`创建用户发生错误：${error}`);
  }
});

module.exports = router;
