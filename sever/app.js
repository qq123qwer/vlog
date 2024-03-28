var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var multer = require('multer') // 上传文件需要用到的插件
var { expressjwt: jwt } = require("express-jwt")
var User = require('./database/User.Collection')
var { generateKeys } = require('./plugins/util.js')
// 公钥
var { getPublickeySyn } = require('./plugins/rsaControl')
var Key = require('./database/Key.Collection')
// Router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var registRouter = require('./routes/regist')
var getpubkeyRouter = require('./routes/getpubkey')
var busRouter = require('./routes/bus')
var uploadRouter = require('./routes/upload')
var searchRouter = require('./routes/search')
var articles_likeRouter = require('./routes/articles_like')
var column_articlesRouter = require('./routes/column_articles.js') // 根据分类获取文章
require('./socket.js')

// 中间件
var resourceMid = require('./plugins/resourceMid.js')

var app = express();
var assert = require('http-assert')
var ok = require('assert')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')))
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))
// token验证 
let key = getPublickeySyn()
if(!key){
  generateKeys()
}
app.use(jwt({
  secret: getPublickeySyn(),  // 签名的密钥 或 PublicKey
  algorithms: ['RS256'],
  isRevoked: async (req, payload, next) => {
    req._id = payload.payload._id
    req.isPass = true
    try {
      let result = await User.findById({ _id: req._id })
      req._result = result
      //  返回的是{},
      if (!JSON.stringify(result)) {
        req.isPass = false
      }
      next()
    } catch (err) {
      createError(err)
    }
  }
}).unless({
  path: [
    { url: '/login', methods: 'POST' },
    { url: '/regist', methods: 'POST' },
    { url: '/getpubkey', methods: 'GET' },
    { url: '/api/rest/comments', methods: 'GET' },
    { url: '/api/rest/columns', methods: 'GET' },
    { url: '/api/rest/articles', methods: 'GET' },
    { url: '/search', methods: 'GET' },
    { url: '/columnarticles', methods: 'GET' }
  ]
  // 指定路径不经过 Token 解析
}))
app.use('/api/rest/:rescource', resourceMid(), busRouter) // 资源
app.use('/user', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter) // 登录
app.use('/regist', registRouter) // 注册
app.use('/getpubkey', getpubkeyRouter) // 获取公钥
app.use('/upload/:where', uploadRouter) // 上传文件
app.use('/search', searchRouter) // 查找
app.use('/articles_likes', articles_likeRouter) // 点赞
app.use('/columnarticles', column_articlesRouter) // 根据分类获取文章


app.use('/test', (req, res, next) => {
  try {
    assert(true, 401, 'failed')
    res.send(111)
  } catch (err) {
    ok(err.status === 401)
    ok(err.message === 'failed')
    ok(err.expose)
  }
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  // console.log(err.status);
  if (err.name === 'CastError') {
    err.status = 400
    res.locals.message = '数据表错误问题'
  }
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    res.locals.message = '未登录'
  }
  if (err instanceof multer.MulterError) {
    err.code = 400
    err.status = err.code
  }
  res.send({
    StatusCode: err.status || 500,
    Message: res.locals.message
  })
});

module.exports = app;
