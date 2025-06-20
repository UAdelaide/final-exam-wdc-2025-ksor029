var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Dogs */
router.get('/api/dogs', async function(req, res) {
  const [rows] = await db.query(`
    SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs INNER JOIN Users
    -> ON Dogs.owner_id = Users.user_id;
    `);
  res.send(rows);
});

/* GET Open Res */
router.get('/api/dogs', async function(req, res) {
  const [rows] = await db.query(`
    SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs INNER JOIN Users
    -> ON Dogs.owner_id = Users.user_id;
    `);
  res.send(rows);
});

module.exports = router;
