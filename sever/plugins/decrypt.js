const NodeRSA = require('node-rsa')
const { getPrivatekeySync, getPublickeySyn ,getPublickey , getPrivatekey} = require('./rsaControl')
module.exports = {
  decrypt(val) {
    const decrypt = new NodeRSA(getPrivatekeySync());
    decrypt.setOptions({encryptionScheme:'pkcs1'})
    console.log(val,decrypt)
    const decryptedData = decrypt.decrypt(val, 'utf8');
    return decryptedData
  },
  encrypt(val) {
    const encrypt = new NodeRSA(getPublickeySyn());
    encrypt.setOptions({encryptionScheme:'pkcs1'})
    const encryptedData = encrypt.encrypt(val, 'base64');
    return encryptedData
  }
}