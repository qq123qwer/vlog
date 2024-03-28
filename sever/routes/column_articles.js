var express = require('express')
var router = express.Router({ mergeParams: true })
var pagination = require('mongoose-sex-page')
var Column = require('../database/Column.Collection')
const { IdArticles } = require('../public/columnId_articles_populate_map')
router.get('/', async (req, res, next) => {
  let _id = req.query
  let query = await pagination(Column).find({ _id }).populate({
    path: 'aid',
    populate: IdArticles
  })
let result = await query.exec()
res.send({
  StatusCode: 200,
  data: {
    result
  },
  Message: "查询成功"
})
})


module.exports = router