// const mysql = require('mysql2');

// // Create a connection to the database
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_database_user',  // Replace 'your_database_user' with your actual MySQL username (e.g., 'root')
//   password: 'your_database_password',  // Replace 'your_database_password' with your MySQL password
//   database: 'your_database_name' // Replace 'your_database_name' with the name of your database (e.g., 'job_portal')
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database');
// });

// module.exports = db;
const express = require('express');
const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'your_actual_username',
  password: 'your_actual_password',
  port: 3306
};

const con = mysql.createConnection(dbConfig);

con.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected!');
  con.query('CREATE DATABASE mydb', (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
    } else {
      console.log('Database created');
    }
  });
});

module.exports = con;