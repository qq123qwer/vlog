// 获取公钥
var express = require('express');
var Key = require('../database/Key.Collection')
var inflection = require('inflection')
var router = express.Router();
var { getPublickeySyn } = require('../plugins/rsaControl')
var assert = require('http-assert')
var createError = require('http-errors')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let result = await Key.find()
    if(!result.length){
      let content = getPublickeySyn()
      let data = await Key.create({content})
      res.send({
        StatusCode: 200,
        data: data.content,
        Message: "获取成功"
      })
      return 
    }
    res.send({
      StatusCode: 200,
      data: result[0].content,
      Message: "获取成功"
    })
  } catch (err) {
    next(createError(err))
  }
});

module.exports = router;