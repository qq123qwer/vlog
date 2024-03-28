// const NodeRSA = require('node-rsa');
// const newKey = new NodeRSA({b:2048})
// newKey.setOptions({encryptionScheme:'pkcs1'})
// let public_key = newKey.exportKey('pkcs8-public')
// const key = new NodeRSA(public_key)
// console.log(key.encrypt('111' , 'base64'))

// function trim(data){
//   if(typeof data === 'string'){
//     return data.replace(/\s*/g , '')
//   }else if(typeof data === 'object'){
//     // {username:'11 1' ,age:'  12'}
//     return Object.entries(data).reduce((acc , [key , value])=>{
//       acc[key] = trim(value)
//       return acc
//     } , {})
//   }
// }
// const path = require('path')
// // console.log(process.cwd()) // 当前文件夹地址
// // console.log(path)
// console.log(typeof null) // object
// console.log(typeof undefined)
// // let regExp = new RegExp('nihao' , 'i')
// // console.log(regExp) //  /nihao/g

// // 过滤
// // 根据['user' , 'age'] 过滤{'user':'11','age':'11','sex':'aa'},

// // let arr = ['user' , 'age']
// // let obj = {'user':'11','age':'11','sex':'aa'}
// // let result = Object.fromEntries(Object.entries(obj).filter(([key , value])=>{
// //   return arr.includes(key)
// // }))
// // console.log(result)
// // let obj1 = []

// // console.log(obj1.length)
// const jwt_map = {
//   // 更新的字段
//   Article:["title" , "columnId" , "body" ,"cover"] ,
//   User:["password" , "avatar" , "nikname"],
//   Comment:["content"]
// }
// console.log(jwt_map['Article'].includes("title"))
// let arr1 = {}
// console.log(!arr1)
// let arr = []
// console.log(!!arr)
// if(arr){
//   console.log(1)
// }
// if(arr1){
//   console.log(2)
// }
// const {getPrivatekeySync , getPublickeySyn} = require('./plugins/rsaControl')
// const NodeRSA = require('node-rsa')
// let str = 'MQHF9+mI9HE2og8VfcL3DS9VuojckiFCKzdb5livCroZ+rS1n5ewT9SyxEaNO9FsyF622PkuDxwMM9DT0y9/VV4lXq8M2MBr5hUKLEo2PgQltxQ8ajC8pLoupoy5YuebjWz8ryyO6YPi6jFqLHEuB6EKNY6LgN/gSrsFYRLFwiNXSwPmzgO2ZQkbNJYVLntBCwgfdTsfEHKiX+Rdt7ufLPs8Yty1tcRPO6lnB1D6F5MtPyCY0pfMoGQfeSanq8xgPVnqKKH+9tt9C9T24epa6Ab+pDWpiW/Vrd2LRxpn67x3Zs3JKgt8accy9mt1jh0dZmZusEJhpPAWnGVBodzEYw=='
// const prikey = new NodeRSA(getPrivatekeySync() , 'pkcs8-private')
// let str1 = "Ms6hOr+dfDuNsNRRgIlTTqoPMwXkqxkDFIwLpI0oVRIhjGOrV3M9qm9wQ2LyRAnUvfGj870T69+O3g9rkmG8PG91Y9yCxwQDjro4qNJfHobyWvMOlpA90hs9XDvGS3pKXvMew7zWuu+MYIhg1fgGd8tv9cdyLEc0a7D/RwszhXUw/pVAHuyoLXFlImaBeiGVVJ1xSIGtg7pMo++Fm6KYMNMscerDPfsEpAzzkyVhocQQK3VKUQV9BvBhHDYPECi0VZOvIRj1NDKxfp5cqNsIkGWLjPzLKfRY1bTO0eNSigwAskibqvJKPFBMquVKhNkw4Ela7JxRz71LL+i5hGZdwA=="
// const res = prikey.decrypt(Buffer.from(str1 , 'base64') , 'utf8')
// console.log(res)

// 使用公钥加密
// console.log(getPublickeySyn())
// const encrypt = new NodeRSA(getPublickeySyn());
// const encryptedData = encrypt.encrypt('123456', 'base64');
// console.log('Encrypted Data:', encryptedData);

// // 使用私钥解密
// const decrypt = new NodeRSA(getPrivatekeySync() , 'pkcs8-private-pem');
// decrypt.setOptions({encryptionScheme:'pkcs1'})
// let str = 'NVOtMTrqvpAI2RDFbIhvO2ucxGVBTqQMi9arkvBJKwXu5Jl7Mx1UwSuqsjgfXRzrweRLabME/X0W2ll/w0mFLJxmTqCvHlfm1ZdXZ3EdXZoqez0I+L65WFB5AHDn3rmfZUXeFdbP4PDC/kj1IU8tr2wPEJnUYJyyJFycZStdn65oLgVjc264QfevUm87a7NFMxQUWu22VgnGRJXfXkImrRGw8xa/5UwCMEUjieuYy5QkqMG+IPtAEh3gP6c5f8eDJS9HVukukv1XdFMeKoYczo7S/AG+oDcz7YJ6QFWFERJsl/i4Tv8mzFDDEPphFCTSzKvy8gduCEGjN4hW9nwasQ=='
// console.log('Decrypted Data:', decrypt.decrypt(str , 'utf8'));
// var {decrypt,encrypt} = require('./plugins/decrypt')
// // let str = 'gPnzALE1g+AZXzN1/cBK9ZCPLohf67JFlgCDUsarPqIlBPzp0wmpSBl1d2MMs2QRRbbMSFfigAu1qwFKAxm6OnPRlnmpg0yCzvrLoE3jgi0nIduBbx4jyqmdzvZe2nt94uf+A7xaE/i6J8nqBqI8Tpk85u3psld1Zxa4l0D3oxEw4wOxGru74I7gylAwEo8V/tnkwdEH/7ebaQ3uRkKVHdqQgQPKHZQk5XIg6Egbt2kK9eOPSMDBWkX5Xyj+RWN7qJSFggZGytLlAEcrq/14l/bVl5Ro43JWbf0WHreTrGifxXDsQUwfGphODK5WKfABL73UkIlQCvpRKYeE2J6V+j9HINJhp9x9WLf7ViWIPbsOABarpwvRHIW12skNPvHB17X6Xj7WgVvSvEou1+DzuErjrpYdl1zzRv/4CUxa+PV2GtwrIvjsKxmwNbfOOnfhsdojHh9g7Q7UZBkvdIq0CMLk77WunpGYEsDcbj292A7d58P36NRZdcWYlZaIQUTvQHEQYSrfbS1/Bs9/XIL6zkV9h0rNvFrH4vt3tBt850VOI0JEefLK7upffCs17kzmXPHaWmmceoqQbNWODo4ReJgrpMH06g7ASCT1zFdporTO8dZ15rIlfnfwJkSnyOOvd6xhLnza4Jw5njVf760rJa2rjTWmg/3QL5vsPwCj90o='
// let str = 'oReS1X4ar0tCtw+P5akwI571/zbqOghdghmi2Yd6pYh7AJL5+XXfy6TVUBNd8QVdbX998YKyaLpYNmX0GvD+yR0kuJUco8G41aY+CQhdDwOlQndOm0GfHli9QIyVIZ8xM+1DknWTesgEfPUvIzVGZ8n09l9LwCMvzSawtwJR6lf76ZU6WU9ULLNWy1R9vlF56edPQzmxQTTIWGSw1raLbNgWNiQw8Y9dqYO1yjN3jp9LG1jQkWPnp3+NOpkGH3OnxX9fa9Sh2Y3J72tBPdFU88LTOB/J8eKEi0MOE6fFh4A4dN69SkRlpoT1P//Yug7lonGzjwUwLqS8PO8TbRoIHzygN3UG6t7DOyxNH/KlK2aygm3IdCLb2nhPKbD15KrGXJ9u92+dvH2eOCHzqqTiBY+e41XPnC/bC7bACahhJw6YKsZuLootNnU+dRgtFexrySJfPeiyu3D4VpH5ae0JB9YItH2enpaxIw7riLmc7kxQUvBHLHSuCUU8K1jY4mDOu1Z8cbdpLWSTubuo/p7bAGu53rnSq2Ksw3upazdQ0+SBRSIDEF1cjGgO1G1rFw2bvYmbO4rfDkO78uEYyZuQcqDilUd1uXTOZeBft+oscIxYv/RtFUaHlNhayxLa5RzWwBBwUs8BqgLEjJeePHv8KdL6kan+jOt4S1wMiHX5+zE='
// console.log(decrypt(encrypt('123456')))
// console.log(t + 1)
// let date = new Date('2023-11-13T00:55:12.006+00:00')
// console.log(date.getFullYear())
// console.log({yy:11}.length)

// let result = {
//   name:'aaa',
//   age:10,
// }
// let query = {
//   data : result
// }
// console.log(query)
var NodeRSA = require('node-rsa')
var {getPrivatekeySync} = require('./plugins/rsaControl')
function decrypt(val) {
  const decrypt = new NodeRSA(getPrivatekeySync());
  decrypt.setOptions({encryptionScheme:'pkcs1'})
  const decryptedData = decrypt.decrypt(val, 'utf8');
  return decryptedData
}
console.log(decrypt('OslCqFtMX6pL+fpyqREZ+hMMfAShwGO2OerTmQ49+mMbe32v0MDbH4IADldT/GAFllKY4nU1DQdXyaCzvYwjxMpM0/CiUAK99rgAxw+rU/GUVvtC5xx6paywqeCiHa5woG9FFMYt7ExlfXGSje5FsToUimAx62eEcjZ481304knt4qP9ZLxK6Rxu7N1d6pTR3eL+Z5MAGPqt9B8SxTE5wAs8UMz4PQM5o9SgzT2SQdDEihuyQcjq72y7to+8JKDT9o/t4qhXqlRPxL0SfJHmGO7pH5iWYZykuD+BsdadZVRHEwRDy8/ZMXXlCTb4WsIkudc5DqwRQXLt7NddOCH2xwz1cw2gnibGHOVtxQsgL2DIpBnbbTI2U1zp1zP7lSP3iZv7hawltoMLgWPJIucLA5LTS4/G2Vy9NKy2yZAesrgBOINRHU2e7dgfKOA8eNGwN5DnjHpX+emrE/BYFlQisy+5Q56HJbiHST/xbgwGRvAsPr01qBvaPbWczLRzFyOQNFzENTkdwLpP5mDW6iB2DL9SzI6fFWyNuKFcc40brYKf+Z/il5NxW6kC/BqrQum+RQusJmhNo7OfiPx6SwHLYnrvyu9xgUSGbUHQUJImYRkEFk/3dSpxUfdIJklPP8LsCpWbZhQ5mOAVLVP+XfQap5of5gYM93md4pBCQZXgSLM='))