var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* TEST API END POINTS */
router.get('/api/dogs', function(req, res, next){
  res.send(';) tama');
});
router.get('/api/walkrequests/open', function(req, res, next){
  // code
});
router.get('/api/walkers/summary', function(req, res, next){
  // code
});

module.exports = router;
