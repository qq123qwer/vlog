// 注册
var User = require('../database/User.Collection')
var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var assert = require('http-assert')
var ok = require('assert')
var { getPrivatekey } = require('../plugins/rsaControl')
var jwt = require('jsonwebtoken')
var { sendToken } = require('../plugins/sendToken')
var { trim } = require('../plugins/trim')
/* GET users listing. */
router.post('/', async function (req, res, next) {
  console.log(req.body)
  try {
    if (!trim(req.body.email) || !trim(req.body.password)) {
      assert(false, 400, '邮箱密码不能为空')
    }
    let user = await User.findOne({ "email": trim(req.body.email) }).select('email')
    assert(!user, 422, '邮箱地址存在，请重新注册')
    let email = trim(req.body.email)
    let password = trim(req.body.password)
    let result = await User.create({ email, password })
    let token = await sendToken(result)
    res.send({
      StatusCode: 200,
      data: {
        data: {
          "email": result.email
        },
        token
      },
      Message: "注册成功"
    })
  } catch (err) {
    // console.log(err)
    next(createError(err))
  }

});

module.exports = router;