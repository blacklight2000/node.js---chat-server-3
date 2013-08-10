var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
//require('socket.io').listen(app, { log: false }); <-- that's for completely removing socket.io debugging
io.set('log level', 1); // reduce logging
var screenNames = {}

server.listen(8080)

app.get('/', function(req, res) {
  res.sendfile(__dirname+'/index.html')
 })


io.sockets.on('connection', function(socket) {
  console.log("Connection...")
  socket.on('new user', function(data, callback) {
    if(data in screenNames) {
      callback(false)
      } else {
         callback(true)
         socket.screenName = data
         screenNames[socket.screenName] = socket; 
         updatescreenNames()
         }
  })
  function updatescreenNames() {
    io.sockets.emit('usernames',Object.keys(screenNames))
  }

  socket.on('send message', function(data, callback) { 
    var msg = data.trim()
    if(msg.substr(0,3) == '/w ') {
      msg = msg.substr(3)
      var msg_index = msg.indexOf(' ')
      if (msg_index != -1) 
        {
         var name = msg.substring(0, msg_index)
         var msg = msg.substr(msg_index +1)
         if (name in screenNames) 
           {
             screenNames[name].emit('whisper', {msg: msg, screenName: socket.screenName })
             console.log('whisper!')
            
           } else {
            callback('Error: Enter a valid user')
           } 
        } else {
             if (name in screenNames) {
               callback('Error: Please enter a message for your whisper!')
                } else { callback('Error: enter a user from the list of valid users') }
        }
    } else {
          io.sockets.emit('new message', { msg: msg, screenName: socket.screenName }) 
          // console.log(data.trim())
    } 
  })
 
  socket.on('disconnect', function(data) {
    if(!socket.screenName) return
    delete screenNames[socket.screenName]
    updatescreenNames()
    })
 
  })
