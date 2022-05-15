const mysql = require("mysql2");

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // your MySQL username
    user: "root",
    //your mySQL password
    password: "",
    database: "election",
  },
  console.log("connected to the election db")
);

module.exports = db;
