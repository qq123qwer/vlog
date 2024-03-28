// 登录
var express = require('express')
var router = express.Router();
var User = require('../database/User.Collection')
const { sendToken } = require('../plugins/sendToken')
var createError = require('http-errors');
var assert = require('http-assert')
var { trim } = require('../plugins/trim')
var {decrypt} = require('../plugins/decrypt')
/* GET users listing. */
router.post('/', async function (req, res, next) {
  try {
    if (!trim(req.body.email) || !trim(req.body.password) || !req.body.email || !req.body.password) {
      assert(false, 400, '邮箱密码不能为空')
    }
    let user = await User.findOne({ "email": trim(req.body.email) }).select('email password')
    // console.log(user)
    assert(user, 400, "未找到邮箱地址，请先注册")
    // 验证密码
    // console.log(user.password)
    // console.log(decrypt(user.password))
    let result = decrypt(decrypt(user.password))
    assert(decrypt(trim(req.body.password)) === result , 422, '密码不正确')
    let token = await sendToken(user)
    res.send({
      StatusCode: 200,
      data: {
        data: {
          email: user.email,
          avatar: user.avatar
        },
        token
      },
      Message: '登录成功'
    })
  } catch (err) {
    // console.log(err)
    next(createError(err))
  }
});
module.exports = router;
