const mysql = require("mysql2");

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // your MySQL username
    user: "root",
    //your mySQL password
    password: "",
    database: "employee",
  },
  console.log("connected to the employee db")
);

module.exports = db;
