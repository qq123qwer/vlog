
const mongoose = require('./init')
const commentSchema = new mongoose.Schema({
  content:{
    type:String,
  },
  date:{
    type:mongoose.SchemaTypes.Date,
    default:Date.now,
  },
  uid:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"User",
  },
  aid:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"Article"
  }
})



module.exports = mongoose.model('Comment' , commentSchema)