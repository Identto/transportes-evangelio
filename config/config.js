//import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./railway.js";

//const railways = require('./railway.js');

const env = require('env');
const mysql = require('mysql2');
//const port = require('../server');

const db = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED!");
});

module.exports = db;
