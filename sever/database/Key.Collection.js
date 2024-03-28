const mongoose = require('./init')
const keySchema = new mongoose.Schema({
  content:{
    type:String
  },
  date:{
    type:mongoose.SchemaTypes.Date,
    default:Date.now
  }
})
module.exports = mongoose.model('Key' , keySchema)