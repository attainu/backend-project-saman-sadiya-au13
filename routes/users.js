var express = require('express');
const { getUserById } = require('../controllers/user');
var router = express.Router();


router.param("userId", getUserById);

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


module.exports = router;
