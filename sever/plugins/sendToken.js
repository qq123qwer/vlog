const jwt = require('jsonwebtoken')
var {getPrivatekey} = require('./rsaControl')
module.exports = {
  async sendToken(result){
    let privateKey = await getPrivatekey()
    let token = jwt.sign({exp: ~~((Date.now() / 1000) + 24 * 3600 * 3)  , email:result.email ,password:result.password , _id:result._id}, privateKey, { algorithm: 'RS256' })
    return token
  }
}