var express = require('express');
// set up Express Router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Books4Baruch' });
});

module.exports = router;
