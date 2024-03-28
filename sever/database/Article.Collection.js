const mongoose = require('./init')
const articleSchema = new mongoose.Schema({
  // 作者Id
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    default: Date.now
  },
  // 评论集合
  comment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    }
  ],
  //分类标签
  columnId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    default:'654d92e43cca6ccdbb87febb'
  },
  title: {
    type: String,
    required: [true, '不能为空'], // 不能为空
    set(val) {
      return encodeURIComponent(val)
    },
    default: '默认标题' + Date.now // 默认填充的值
  },
  // 封面图
  // 点赞数
  // 浏览数
  hit_num:{
    type:Number,
    default:0,
  },
  like_num:{
    type:Number,
    default:0
  },

  cover: {
    type: String, // url 地址
    default: 'http://127.0.0.1:8080/articles/h1_1699446277253.jpg',
  },
  body: {
    type: String,
    required: [true, '必填项'],
    set(val) {
      val = val.replace(/"/g , "'")
      return encodeURIComponent(val)
    }
  },
  date:{
    type:mongoose.SchemaTypes.Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', articleSchema)