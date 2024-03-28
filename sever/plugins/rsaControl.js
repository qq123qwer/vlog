const fs = require('fs').promises
const fsSync = require('fs')
const { generateKeys } = require('./util')
const { pubKeyPath, priKeyPath } = require('./config')
module.exports = {
  getPublickeySyn() {
    let key
    key = fsSync.readFileSync(pubKeyPath, 'utf-8')
    if (!key) {
      // generateKeys()
      key = fsSync.readFileSync(pubKeyPath, 'utf8')
    }
    return key
  },
  getPrivatekeySync() {
    let key
    key = fsSync.readFileSync(priKeyPath, 'utf-8')
    if (!key) {
      // generateKeys()
      key = fsSync.readFileSync(priKeyPath, 'utf8')
    }
    return key
  },
  async getPublickey() {
    let key
    try {
      key = await fs.readFile(pubKeyPath, 'utf-8')
    } catch (error) {
      // generateKeys()
      key = await fs.readFile(pubKeyPath, 'utf8')
    }
    return key
  },
  async getPrivatekey() {
    let key
    try {
      key = await fs.readFile(priKeyPath, 'utf-8')
    } catch (error) {
      // generateKeys()
      key = await fs.readFile(priKeyPath, 'utf8')
    }
    return key
  }
}