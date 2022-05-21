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
  const sql3 = `SELECT e.id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "LAST NAME", roles.title AS Title, roles.salary AS Salary, department.name AS "Department Name", m.first_name AS "Employees Manager" From employee e JOIN roles ON e.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id;`;
  db.query(sql3, (err, rows) => {
    console.table(rows);
  });
}

function updatedEmployeeRole() {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.id AS "role_id" FROM employee, roles, department WHERE department.id = roles.department_id AND roles.id = employee.role_id`;

  db.query(sql, (error, response) => {
    if (error) throw error;

    let employeeNamesArray = [];
    response.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    let rolesql = `SELECT roles.id, roles.title FROM roles`;
    db.query(rolesql, (error, response) => {
      if (error) throw error;
      let rolesArray = [];
      response.forEach((role) => {
        rolesArray.push(role.title);
      });

      inquirer
        .prompt([
          {
            name: "chosenEmployee",
            type: "list",
            message: "Which employee has a new role?",
            choices: employeeNamesArray,
          },
          {
            name: "chosenRole",
            type: "list",
            message: "What is their new role?",
            choices: rolesArray,
          },
        ])
        .then((answer) => {
          let newTitleId, employeeId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              newTitleId = role.id;
            }
          });

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let employeesqls = `UPDATE employee SET role_id=? WHERE id=?;`;

          db.query(
            employeesqls,
            [newTitleId, employeeId],

            (error) => {
              if (error) throw error;
              console.log("The employees role has been updated");
            }
          );
        });
    });
  });
}

function addedEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "what is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
    ])
    .then((answer) => {
      const nameInformation = [answer.firstName, answer.lastName];
      const rolessql = `SELECT roles.id, roles.title FROM roles`;
      db.query(rolessql, (error, data) => {
        if (error) throw error;
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((rolechoice) => {
            const role = rolechoice.role;
            nameInformation.push(role);

            const managersql = `SELECT * FROM employee`;
            db.query(managersql, (error, data) => {
              if (error) throw error;
              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  nameInformation.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
                  db.query(sql, nameInformation, (error) => {
                    if (error) throw error;
                    console.log("Employee has been added");
                    viewAllEmployee();
                  });
                });
            });
          });
      });
    });
}

function addedDepartment() {
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
          console.log("You must add the Department First");
          addedDepartment();
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



module.exports = {
  viewAllDepartment,
  viewAllEmployee,
  viewAllRoles,
  updatedEmployeeRole,
  addedEmployee,
  addedRoles,
  addedDepartment
};

db.connect((err) => {
  if (err) throw err;
});
