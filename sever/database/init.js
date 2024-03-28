const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db_blog',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err)=>{
  console.log(err)
})
db.on('open' , ()=>{
  console.log('连接成功')
})

module.exports = mongoose