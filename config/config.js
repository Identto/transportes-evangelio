//import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./railway.js";

//const railways = require('./railway.js');

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './env';

const mysql = require('mysql2');
//const port = require('../server');

const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED!");
});

module.exports = db;
