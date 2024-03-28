// 获取资源
var express = require('express');
var pagination = require('mongoose-sex-page')
var router = express.Router({ mergeParams: true });
var assert = require('http-assert')
var createError = require('http-errors')
var Article = require('../database/Article.Collection')
var User = require('../database/User.Collection')
var Column = require('../database/Column.Collection')
// 每种表的映射
const {action_map} = require('../public/table_map.js')
const {populate_map} = require('../public/find_table_populate_map.js')
const {auth_map , jwt_map} = require('../public/update_map.js')

// 查询所有表的信息
router.get('/', async (req, res, next) => {
  // 文章表：获取作者信息,评论集合，分类标签，
  try {
    console.log(req)
    let name = req.Model.collection.modelName
    let target = action_map[name]
    // 获取条件
    let queryName = populate_map[name]
    // 判断条件
    assert(queryName && target, 400, '错误')
    // 跳转对应文章
    if (req.query.article_id) {
      let _id = req.query.article_id // 拿到目标文章的ID
      let query = await pagination(target).find({ _id })
      queryName.forEach(item => {
        query = query.populate(item)
      })
      let result = await query.page(req.query.page).size(req.query.size).sort({ date: -1 }).exec()
      // let result = await Article.findById({_id}).populate({path:'authorId' , select:'nikname'}).populate({path:'columnId' , select:'name'}).populate({path:'comment' , select:'uid'})
      // 增加点击量
      if (name === 'Article') {
        await Article.findByIdAndUpdate(_id, { $inc: { hit_num: 1 } })
      }
      res.send({
        StatusCode: 200,
        data: {
          result
        },
        Message: "查询成功"
      })
      return
    }
    let query = await pagination(target).find({})
    queryName.forEach(item => {
      query = query.populate(item)
    })
    //   let data = await pagination(req.Model).page(1).size(4).display(5).find({}).exec()
    let result = await query.page(req.query.page).size(req.query.size).sort({ date: -1 }).exec()
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
//------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

router.post('/', async (req, res, next) => {
  // 添加分类，添加文章，添加评论都需登录
  try {
    assert(req.isPass, 401, '无权限')
    // 添加文章
    if (req.Model.collection.modelName === "Article") {
      let content = Object.assign(req.body, { "authorId": req._id })
      let data = await req.Model.create(content)
      await User.findByIdAndUpdate(req._id, { $push: { 'aid': data._id } })
      await Column.findByIdAndUpdate(data.columnId, { $push: { 'aid': data._id } })
      res.send({
        StatusCode: 200,
        data: {
          data
        },
        Message: "上传成功"
      })
      return
    }
    // 添加评论
    if (req.Model.collection.modelName === 'Comment') {
      // 添加评论
      let content = Object.assign(req.body, { "uid": req._id })
      let data = await req.Model.create(content)
      // 根据文章ID，更新评论字段
      await Article.findByIdAndUpdate(data.aid, { $push: { 'comment': data._id } })
      res.send({
        StatusCode: 200,
        data,
        message: "上传成功"
      })
      return
    }
    // 添加分类
    if (req.Model.collection.modelName === 'Column') {
      // 添加分类
      let result = await Column.find({ name: req.body.name })
      if (!result.length) {
        let data = await req.Model.create(req.body)
        res.send({
          StatusCode: 200,
          data,
          Message: "上传成功"
        })
        return
      }
      res.send({
        StatusCode: 400,
        Message: "分类名称已存在"
      })
      return
    }

  } catch (err) {
    next(createError(err))
  }
})

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

router.put('/', async (req, res, next) => {
  try {
    // url地址必传id
    assert(req.isPass, 400, '无权限')
    let { id } = req.query
    let name = req.Model.collection.modelName
    assert(id && req.Model, 400, 'id必传 / 表不存在')
    let data = await req.Model.findById(id)
    assert(data, 404, "资源不存在")
    assert(data?.[auth_map[`${name}`]], 400, '无权限')
    // 目标表 req.Model
    let result = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => {
      return jwt_map[`${name}`].includes(key)
    }))
    await req.Model.findByIdAndUpdate({ _id: id }, result)
    res.send({
      StatusCode: 200,
      Message: "更新成功"
    })
  } catch (err) {
    next(createError(err))
  }
})



router.delete('/', async (req, res, next) => {
  try {
    assert(req.isPass, 400, '无权限')
    // id必传
    let { id } = req.query
    // 用户id
    assert(id && req.Model, 400, 'id必传 / 表不存在')
    // 如果是文章删除，对应的用户Id和分类表都要删除 , 还有文章表
    if (req.Model.collection.modelName === "Article") {
      // 获取文章的分类id
      let columnid = await req.Model.findById({ _id: id })
      columnid = columnid['columnId']
      await req.Model.findByIdAndDelete({ _id: id })
      await User.findByIdAndUpdate({ _id: req._id }, { $pull: { 'aid': id } })
      await Column.findByIdAndUpdate({ _id: columnid }, { $pull: { 'aid': id } })
      res.send({
        StatusCode: 200,
        Message: "删除成功"
      })
      return
    }
    // 如果是评论删除， 对应的评论表和文章表都应删除此评论
    let aid = await req.Model.findById({ _id: id })
    aid = aid['aid']
    await req.Model.findByIdAndDelete({ _id: id })
    await Article.findByIdAndUpdate({ _id: aid }, { $pull: { 'comment': id } })
    res.send({
      StatusCode: 200,
      Message: "删除成功"
    })
  } catch (err) {
    next(createError(err))
  }
})

module.exports = router