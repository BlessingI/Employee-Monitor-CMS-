const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "startQuestion",
        message: "What would you like to do? ",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((response) => {
      switch (response.startQuestion) {
        case "view all departments":
          const sql = `SELECT * FROM department`;
          db.query(sql, (err, rows) => {
            console.table(rows);
          });
          break;

        case "view all roles":
          const sql1 = `SELECT * FROM roles`;
          db.query(sql1, (err, rows) => {
            console.table(rows);
          });
          break;

        case "view all employees":
          const sql3 = `SELECT * FROM employee`;
          db.query(sql3, (err, rows) => {
            console.table(rows);
          });
          break;

        case "add a department":
          console.log("add department");
          break;
        case "add a role":
          console.log("add role");
          break;
        case "add an employee":
          console.log("add an employee");
          break;
        case "update an employee role":
          console.log("shat-up");
          break;
        default:
          "I may never be used";
          console.log("who cares");
          break;
      }
    });
};

promptUser();

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});
