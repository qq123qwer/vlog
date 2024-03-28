var express = require('express')
var router = express.Router({ mergeParams: true })
var pagination = require('mongoose-sex-page')
var createError = require('http-errors')
var assert = require('http-assert')
var Article = require('../database/Article.Collection')
router.get('/', async (req, res, next) => {
  try {
    let { question } = req.query
    question = decodeURIComponent(question)
    let target = new RegExp(encodeURIComponent(question), 'i')
    let result = await pagination(Article).find({
      $or: [
        { title: { $regex: target } },
        { body: { $regex: target } }
      ]
    }).exec()
    assert(Object.keys(result).length, 404, '未找到')
    res.send({
      StatusCode: 200,
      data: {
        result
      },
      Message: "查询成功"
    })
  } catch (err) {
    next(createError(err))
  }
})

module.exports = router