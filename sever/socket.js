/*
 * @Author: qq123qwer 2940077027@qq.com
 * @Date: 2024-01-18 18:01:00
 * @LastEditors: qq123qwer 2940077027@qq.com
 * @LastEditTime: 2024-03-10 09:12:17
 * @FilePath: \sever\socket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// let webSocketServer = require('ws').Server
// let ws = new webSocketServer({port: 8888})
// ws.on('connection' , (ws)=>{
//   console.log('socket连接')
//   setInterval(()=>{
//     // ws.send(JSON.stringify({a:1 , b : 2}))
//   } , 1000)
//   ws.on('message' , (msg)=>{
//     ws.send('我也是' + msg)
//   })
// })
const {formatDate , createTempId} = require('./plugins/util')
const app = require('./app')
const http = require('http')
const socketIo = require('socket.io')
const httpServer = http.Server(app)
const io = socketIo(httpServer , {})
const users = {}
io.on('connection' , (socket)=>{
  console.log('建立连接')
  // 断开连接
  socket.on('disconnection' , ()=>{
    console.log('断开连接')
    let uid = socket.uid
    delete users[uid]
  })
  // 用户登录，聊天室自动连接
  socket.on('online',({uid , nikname})=>{
    if(users[uid]){
      users[uid].socket.disconnect()
      delete users[uid]
    }
    users[uid]={
      uid ,
      nikname ,
      socket: socket
    }
    socket.uid = uid
    socket.ghost = false
  })
  // 进入聊天室
  socket.on('enterChat'  , ({uid=createTempId() , nikname='xxx'})=>{
    io.sockets.emit('logged' , {nikname,isLogin: true})
    if(users[uid]){
      return
    }
    users[uid] = {
      uid,
      nikname,
      socket:socket,
    }
    socket.ghost = true
    socket.uid = uid
  })
  // 离开聊天shi
  socket.on('leaveChat' , ()=>{
    let uid = socket.uid
    if(socket.ghost){
      users[uid].socket.disconnect()
      io.sockets.emit('logout' , {nikname:users[uid]?.nikname, isLogin: false})
      delete users[uid]
      return 
    }
    io.sockets.emit('logout' , {nikname:users[uid]?.nikname, isLogin: false})
  })
  // 发送信息
  socket.on('chat' , (msg)=>{
    socket.broadcast.emit('response_chat' , {
      nikname:users[socket['uid']].nikname,
      msg,
    })
  })
})
httpServer.listen(8888)
module.exports = httpServer