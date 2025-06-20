var express = require('express');
var router = express.Router();
const db = require('.../models/db');

/* GET home page. */
router.get('/api/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
