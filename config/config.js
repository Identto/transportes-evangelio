//import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./railway.js";

//const railways = require('./railway.js');

const mysql = require('mysql2');
const port = require('../server');


const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'transportes_evangelio'
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED!");
});

module.exports = db;
