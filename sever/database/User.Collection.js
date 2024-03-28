// 用户表初始化
const NodeRSA = require('node-rsa')
const { getPublickeySyn, getPrivatekeySync } = require('../plugins/rsaControl')
const mongoose = require('./init')
var {decrypt , encrypt} = require('../plugins/decrypt')
const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    index: true,
    required: [true, '邮箱地址必填'],
    unique: true,
    validate: {
      validator: function (val) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)
      },
      message: '邮箱格式不正确'
    }
  },
  password: {
    type: String,
    required: [true, '必填'],
    select: false,
    validate: {
      validator(val) {
        return val !== '密码格式不正确'
      },
      message: '密码错误'
    },
    set(val) {
      let isvalidate = /^\d{6}$/.test(decrypt(val))
      if (isvalidate) {
        return encrypt(val)
      }
      return '密码格式不正确'
    }
  },
  // 上传图像地址
  avatar: {
    type: String,
    default: 'http://127.0.0.1:8080/articles/h1_1699446277253.jpg', // 默认头像地址
  },
  // 昵称
  nikname: {
    type: String,
    default: Date.now
  },
  // 文章信息
  aid: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  }],
  likes_array:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  }],
})
module.exports = mongoose.model('User', userSchema)