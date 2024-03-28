const mongoose = require('./init')
const columnSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
  },
  date:{
    type:mongoose.SchemaTypes.Date,
    default:Date.now,
  },
  aid:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:"Article",
    }
  ]
})

module.exports = mongoose.model('Column' , columnSchema)