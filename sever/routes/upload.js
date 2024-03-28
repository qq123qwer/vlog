
// 上传的文件
const express = require('express')
const router = express.Router({ mergeParams: true })
const whereMap = {
  "users": "users",
  "articles": "articles"
}
const path = require('path')
const assert = require('http-assert')
const createError = require('http-errors')

const multer = require('multer')
const storage = multer.diskStorage({
  // 存储位置
  destination(req, res, cb) {
    cb(null, path.join(process.cwd(), '/upload', `${req.params.where}`))
  },
  filename(req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext)
  }
})
const upload = multer({
  storage,
  limits: 10240 // 限制文件大小
})

router.post('/', upload.any(), async (req, res, next) => {
  try {
    assert(req.isPass, 400, '无权限')
    assert(whereMap[req.params.where], 400, '未找到存储文件夹')
    // let { id } = req.params // 必须结构赋值
    // console.log(id)
    // console.log('111')
    // if (req.params.where === 'users') assert(id, 400, '必须传iD')
    let { destination, filename } = req.files[0]
    // 不用设置文件夹,默认在指定文件夹中寻找
    let fileUrl = path.join('http://127.0.0.1:8080', path.parse(destination).name, filename).replace(/\\/g, '/').replace('http:/', 'http://')
    // wangEditor上传文件的响应信息写法
    if(req.params.where === 'users'){
      res.send({
        StatusCode: 200,
        Message: "success",
        data: {
           imageUrl: fileUrl
        }
      })
      return
    }
    res.send({
      "errno": 0,
      "data": {
        "url": `${fileUrl}`,
        "href": `${fileUrl}`
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      "errno": 1, // 只要不等于 0 就行
      "message": "失败信息"
    })
    return
  }
})





module.exports = router