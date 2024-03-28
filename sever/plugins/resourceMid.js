// 中间件
const inflection = require('inflection')
const createError = require('http-errors')
module.exports = (option)=>{
  return async (req,res,next)=>{
    try{
      req.Model = require(`../database/${inflection.classify(req.params.rescource)}.Collection.js`)
      next()
    }catch(err){
      next(createError(err))
    }
  }
}