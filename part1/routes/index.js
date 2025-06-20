var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* TEST API END POINTS */
router.get('/api/dogs', function(req, res, next){
  //code
});
router.get('/api/walkrequests/open', function(req, res, next){
  // code
});
router.get('/api/walkers/summary', function(req, res, next){
  // code
});

router.get('/result', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "SHOW TABLES";
      connection.query(query, function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          return;
        }
      res.json(rows); // send response
      });
  });
});

module.exports = router;
