var express = require('express');
var router = express.Router();

var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();

var chat_channel = 'chat';

/* GET home page. */
router.get('/', function(req, res, next) {
  // subscribe on channel
  redis.subscribe(chat_channel, function (err, count) {
    pub.publish(chat_channel, 'Bonjour le tchat !');
  });

  // get messages in console
  redis.on('message', function (channel, message) {
      console.log('Receive message %s', message);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
