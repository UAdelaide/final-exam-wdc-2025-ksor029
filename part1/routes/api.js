var express = require('express');
var router = express.Router();
const db = require('../models/db');

/* GET Dogs */
router.get('/dogs', async function(req, res) {
  const [rows] = await db.query(
    `SELECT * FROM Dogs`
  );
  res.send(rows);
});
