var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* TEST API END POINTS */
router.get('/', function(req, res, next){
  //code
});



module.exports = router;
