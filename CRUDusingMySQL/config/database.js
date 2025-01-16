// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Admin@123",
//   database:'HR_DB'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "select first_name,last_name,salary from employees where employee_id%2=0";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//     //   console.log(result);
//       console.log(con);
//     });
//   });

require('dotenv').config();
const mysql = require('mysql2');
const { logger } = require('../utils/logger');

//! Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//! Connect to the database
connection.connect((err) => {
  if (err) {
    logger.error(`${new Date().toISOString()} [database.js] error: ${err.message}`);
    throw err;
  }
  logger.info('Connected to database');
});

module.exports = connection;