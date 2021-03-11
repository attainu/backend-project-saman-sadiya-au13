var express = require('express');
const { getAllProductsUserPage } = require('../controllers/products');
const { getUserById } = require('../controllers/user');
var router = express.Router();


router.param("userId", getUserById);

/* GET users listing. */
router.get('/user', getAllProductsUserPage);


router.get('/cart', function(req, res) {
  res.render('cart', { title: 'User' });
});

// router.get('/userorderdetail', function(req, res) {
//   res.render('userorderdetail', { title: 'User' });
// });

module.exports = router;
