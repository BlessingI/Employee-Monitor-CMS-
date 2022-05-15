const inquirer = require("inquirer");

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
      //   if(response.startQuestion === "view all departments"){
      //       console.log("yeah")
      //   }
      switch (response.startQuestion) {
        case "view all departments":
          console.log("departments");
          break;
        case "view all roles":
          console.log("roles");
          break;
        case "view all employees":
          console.log("employees");
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
