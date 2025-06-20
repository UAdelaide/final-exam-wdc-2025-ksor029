require('dotenv').config(); // load environmental variables

const mysql = require('mysql2/promise');

// create a pooled connection to handle concurrent queries efficiently
const pool = mysql.createPool({
   
});