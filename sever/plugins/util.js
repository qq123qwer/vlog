const fs = require('fs')
const NodeRA = require('node-rsa')
const {pubKeyPath , priKeyPath} = require('./config')
const NodeRSA = require('node-rsa')
const {getPrivatekeySync} = require('./rsaControl')
function generateKeys(){
  const newKey = new NodeRA({b:512})
  newKey.setOptions({encryptionScheme:'pkcs1'})
  let public_key = newKey.exportKey('pkcs8-public-pem')
  let private_key = newKey.exportKey('pkcs8-private-pem')
  fs.writeFileSync(priKeyPath , private_key)
  fs.writeFileSync(pubKeyPath , public_key)
}
function toDouble(data){
  return String(data)[1] && String(data) || '0'+data
}
function formatDate({date = new Date() , format='yyy-MM-dd hh:mm:ss'}){
  let regMap = {
    'y':date.getFullYear(),
    'M':toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate()),
    'h' : toDouble(date.getHours()),
    'm' : toDouble(date.getMinutes()),
    's': toDouble(date.getSeconds()),
  }
  return Object.entries(regMap).reduce((acc , [reg,value])=>{
    return acc.replace(new RegExp(`${reg}+` , 'g') , value)
  },format)
}
function createTempId(){
  return Date.now() + Math.random().toString(36).slice(-6)
}
// 公钥加密,私钥解密
module.exports = {
  generateKeys,
  formatDate,
  createTempId,
}
