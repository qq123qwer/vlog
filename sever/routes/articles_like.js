var express = require('express')
var router = express.Router({ mergeParams: true })
var createError = require('http-errors')
var assert = require('http-assert')
var Article = require('../database/Article.Collection')
var User = require('../database/User.Collection')
router.post('/', async (req, res, next) => {
  try {
    assert(req.isPass, 401, '无权限') // 鉴权
    // 根据url获取文章的ID
    let id = req.query.id
    assert(req.query.id, 400, 'id必传')
    // 寻找文章并且更新点赞数
    let result = await User.findById({ _id: req._result._id })
    if (result.likes_array.includes(id)) {
      await User.findByIdAndUpdate({ _id: req._result._id }, { $pull: { likes_array: id } })
      await Article.findByIdAndUpdate({ _id: id }, { $inc: { like_num: -1 } })
      res.send({
        StatusCode: 200,
        Message: "取消点赞"
      })
      return
    }
    await User.findByIdAndUpdate({ _id: req._result.id }, { $addToSet: { likes_array: id } })
    await Article.findByIdAndUpdate({ _id: id }, { $inc: { like_num: 1 } })
    // 删掉点赞信息
    // await Article.findByIdAndUpdate({ _id: id }, { $pull: { likeId: req.query.likeId } })
    res.send({
      StatusCode: 200,
      Message: "点赞成功"
    })
  } catch (err) {
    next(createError(err))
  }
})



module.exports = router