const express = require('express');
const path = require('path');
require('dotenv').config();

var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'dogwalks'
});

const app = express();

// Middleware


app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req, res, next){
    req.pool = dbConnectionPool;
    next();
});


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;