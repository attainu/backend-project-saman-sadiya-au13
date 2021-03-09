var express = require('express');
const { getAllProductsAdminPage, getProductById } = require('../controllers/products');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin', { title: 'Admin' });
});

router.get('/menu', getAllProductsAdminPage);

router.get('/menuform', function(req, res) {
  res.render('menuform', { title: 'Admin' });
});

router.get('/todayorder', function(req, res) {
  res.render('todayorder', { title: 'Admin' });
});

router.get('/trackorder', function(req, res) {
  res.render('trackorder', { title: 'Admin' });
});

router.get('/searchorders', function(req, res) {
  res.render('searchorders', { title: 'Admin' });
});

module.exports = router;
