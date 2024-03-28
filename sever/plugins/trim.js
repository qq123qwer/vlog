var createError = require('http-errors')
module.exports = {
  trim(data){
    if(data){
      return data.replace(/\s*/g,'')
    }
    return false
  }
}