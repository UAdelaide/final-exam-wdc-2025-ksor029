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
    ON Dogs.owner_id = Users.user_id;
    `);
  res.send(rows);
});

/* GET Open Reqs */
router.get('/api/walkrequests/open', async function(req, res) {
  const [rows] = await db.query(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username FROM WalkRequests INNER JOIN Dogs
      On WalkRequests.dog_id = Dogs.dog_id INNER JOIN Users
      ON Dogs.owner_id = Users.user_id
      WHERE WalkRequests.status = 'open';
    `);
  res.send(rows);
});

/* GET Walker summary */
router.get('/api/walkers/summary', async function(req, res) {
  const [rows] = await db.query(`
    SELECT
      Users.username AS walker_username,
      (SELECT COUNT(*)
      FROM WalkRatings INNER JOIN Users
      ON WalkRatings.walker_id = Users.username) AS total_ratings,
      (SELECT AVG(WalkRatings.rating)
      FROM WalkRatings INNER JOIN Users
      ON WalkRatings.walker_id = Users.username) AS average_rating,
      (SELECT COUNT(*)
      FROM Users
      INNER JOIN WalkApplications ON Users.user_id = WalkApplications.walker_id
      INNER JOIN WalkRequests ON WalkApplications.request_id = WalkRequests.request_id
      WHERE WalkRequests.status = 'open') AS completed_walks
    FROM Users
    WHERE Users.role = 'walker';
    `);
  res.send(rows);
});

module.exports = router;
