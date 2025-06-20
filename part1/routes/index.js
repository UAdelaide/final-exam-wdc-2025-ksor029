var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Dogs */
router.get('/api/dogs', async function(req, res) {
  const [rows] = await db.query(
  );
  res.send('hihi');
});



module.exports = router;
