require('dotenv').config(); // load environmental variables

const mysql = require('mysql2/promise');

// create a pooled connection to handle concurrent queries efficiently

const pool = mysql.createPool({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'root',
\   database: process.env.DB_NAME || 'DogWalkService',
   waitForConnections: true,
   connectionLimit: 1000,
   queueLimit: 0
});

module.exports = pool;
