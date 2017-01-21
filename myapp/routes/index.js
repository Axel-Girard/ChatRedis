var express = require('express');
var router = express.Router();

// var Redis = require('ioredis');
// var redis = new Redis(6379, '88.190.3.123');
// var pub = new Redis();

/* GET home page. */
router.get('/', function(req, res, next) {
  // redis.subscribe('news', 'music', function (err, count) {
  //   // Now we are subscribed to both the 'news' and 'music' channels.
  //   // `count` represents the number of channels we are currently subscribed to.
  //
  //   pub.publish('news', 'Hello world!');
  //   pub.publish('music', 'Hello again!');
  // });
  res.render('index', { title: 'Express' });
});

module.exports = router;
