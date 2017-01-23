var express = require("express");
var app = express();
var colors = require('colors');
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();

server.listen(port, function () {
  console.log(colors.rainbow('Server listening at port ' + port));
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', "pug");
app.engine('pug', require('pug').__express);

app.get("/", function(req, res){
  res.render("index");
});

io.sockets.on('connection', function (socket) {
  redis.subscribe('username', 'chat', function (err) {
    // We are connected to channel chat
    redis.on('message', function (channel, message) {
      // Receive messages from channel chat
      socket.emit('message', {
        channel: channel,
        message: message
      });
    });
  });

  socket.on('send', function (data) {
    pub.publish('username', data.username);
    pub.publish('chat', data.message);
  });
});
