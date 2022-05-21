const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

function viewAllDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    console.table(rows);
  });
}

function viewAllRoles() {
  const sql1 = `select roles.id AS Roles_Id, roles.title AS Roles_title, roles.salary AS Roles_Salary, department.name AS Department_Name FROM roles INNER JOIN department ON roles.department_id=department.id`;
  db.query(sql1, (err, rows) => {
    console.table(rows);
  });
}

function viewAllEmployee() {
  const sql3 = `SELECT e.id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "LAST NAME", roles.title AS Title, roles.salary AS Salary, department.name AS "Department Name", m.first_name AS "Employees Manager" From employee e JOIN roles ON e.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id;`
  db.query(sql3, (err, rows) => {
    console.table(rows);
  });
}

function addedDeparment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        message: "what is the name of the department you want to add? ",
        type: "input",
        name: "dept",
      },
    ])
    .then((answer) => {
      var newName = answer.dept;
      db.query(
        "INSERT INTO department (name) VALUES(?)",
        [newName],
        function (err) {
          if (err) throw err;
          viewAllDepartment();
        }
      );
    });
}

function addedDeparment() {
  inquirer
    .prompt([
      {
        message: "what is the name of the department you want to add? ",
        type: "input",
        name: "dept",
      },
    ])
    .then((answer) => {
      var newName = answer.dept;
      db.query(
        "INSERT INTO department (name) VALUES(?)",
        [newName],
        function (err) {
          if (err) throw err;
          console.log(`added ${newName} to the database`);
          viewAllDepartment();
        }
      );
    });
}

function addedRoles() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    let deptArraynames = [];
    rows.forEach((department) => {
      deptArraynames.push(department.name);
    });
    deptArraynames.push("Add new Department");
    inquirer
      .prompt([
        {
          name: "departmentName",
          message: "which department does the role belong to? ",
          type: "list",
          choices: deptArraynames,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Add new Department") {
          console.log("You must add the Department First")
          addedDeparment();
        } else {
          addRoleResume(answer);
        }
      });

    const addRoleResume = (departmentData) => {
      inquirer
        .prompt([
          {
            message: "what is the name of the role you want to add? ",
            type: "input",
            name: "role",
          },
          {
            message: "what is the Salary of the role? ",
            type: "input",
            name: "number",
          },
        ])
        .then((answer) => {
          var newRole = answer.role;
          var salaryAmount = answer.number;
          let departmentId;

          console.log(rows);

          rows.forEach((department) => {
            if (departmentData.departmentName === department.name) {
              departmentId = department.id;
              console.log(departmentId);
            }
          });

          db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)",
            [newRole, salaryAmount, departmentId],
            function (err) {
              if (err) throw err;
              viewAllRoles();
            }
          );
        });
    };
  });
}

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
          viewAllDepartment();
          break;

        case "view all roles":
          viewAllRoles();
          break;

        case "view all employees":
          viewAllEmployee();
          break;

        case "add a department":
          addedDeparment();
          break;
        case "add a role":
          addedRoles();
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
