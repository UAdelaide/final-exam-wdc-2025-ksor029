require('dotenv').config(); // load environmental variables

const mysql = require('mysql2/promise');

// create a pooled connection to handle concurrent queries efficiently

const pool = mysql.createPool({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '123',
   database: process.env.DB_NAME || 'DogWalkService',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

/*
const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'mypassword',
   database: 'DogWalkService  ',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});
*/

module.exports = pool;
