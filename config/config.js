const mysql = require('mysql');

import {
DB_HOST,
DB_NAME,
DB_PASSWORD,
DB_PORT,
DB_PORT,
DB_USER
} from './railway.js'

const db = mysql.createConnection({
    host: DB_HOST,
    //DB_HOST : process.env.DB_HOST || 'localhost',
    user: DB_USER,
    //DB_USER : process.env.DB_USER || 'root',
    password: DB_PASSWORD,
    //DB_PASSWORD : process.env.DB_PASSWORD || 'password',
    database: DB_NAME
    //DB_NAME : process.env.DB_NAME || 'transportes_evangelio'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;