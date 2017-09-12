var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', (req, res) => {
  var categories = db.get('categories');
  categories.find({}, {}, (err, categories) => {
    res.render('add', {
      title: 'Add Post',
      categories
    });
  });
});

router.post('/add', (req, res, next) => {
  // get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();

  // get image
  if(req.files.image) {
    // define variable of the file info
    const img = req.files.image;
    var imgOriginalName = img.originalName;
    var imgName = img.name;
    var imgMime = img.mimetype;
    var imgPath = img.path;
    var imgExt = img.extension;
    var imgSize = img.size;
  } else {
    var imgName = 'noimage.png';
  }

  // validation
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Post Body is required');
  // check errors
  var errors = req.validationErrors();

  if(errors) {
    res.render('add', { errors, title, body });
  } else {
    var post = db.get('posts');
    // submit to db
    posts.insert({ title, body, category, date, author, image: imgName}, (err, post) => {
      if(err) {
        res.send('There was an error');
      } else {
        req.flash('success', 'Post Submitter');
        res.location('/');
        res.redirect('/');
      }
    });
  }

});

module.exports = router;
