var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', function(req, res, next) {
  /*var db = req.db;
  //var posts = db.get('posts');
  //test
  var posts = {a: 'a'};
  posts.find({}, {}, (err, posts) => {
    res.render('index', {
      title: 'Express',
      flashmsg: '',
      posts: posts
    });
  });*/
  res.render('index', { test: 'haashaahh' });
});

module.exports = router;
