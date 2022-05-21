const inquirer = require("inquirer");
const db = require("./db/connection");

const {
  viewAllDepartment,
  viewAllEmployee,
  viewAllRoles,
  updatedEmployeeRole,
  addedEmployee,
  addedRoles,
  addedDepartment,
} = require("./functions");

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
          "exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.startQuestion) {
        case "view all departments":
          viewAllDepartment();
          break;

        case "view all roles":
          viewAllRoles();
          break;

        case "view all employees":
          viewAllEmployee();
          break;

        case "add a department":
          addedDepartment();
          break;
        case "add a role":
          addedRoles();
          break;
        case "add an employee":
          addedEmployee();
          break;
        case "update an employee role":
          updatedEmployeeRole();
          break;
        case "exit":
          db.end();
          break;
      }
    });
};



promptUser()

