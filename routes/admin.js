var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('adminLogin', { title: 'Express' });
});


module.exports = router;
