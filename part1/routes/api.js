var express = require('express');
var router = express.Router();
const db = require('.../models/db');

/* GET home page. */
router.get('/api/dogs', async function(req, res) {
  const [rows] = await db.query(
    `SELECT * FROM Dogs`
  );
  res.send(rows);
});
