const path = require('path')
module.exports = {
  pubKeyPath : path.join(process.cwd() , '/auth/public.cer') ,
  priKeyPath : path.join(process.cwd() , '/auth/private.cer') ,
}