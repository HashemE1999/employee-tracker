const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: 'Fr33l4nc3C0d3r!',
      host: 'localhost',
      database: 'employee_tracker'
  },
  console.log('Connected to the courses_db database!')
  )
  
  pool.connect(); 
  let options = [{
    type: 'list',
    message: 'Select any option from below:',
    name: 'userChoice',
    choices: ["View all departments", "View all employees"]
  }]

function init () {
    inquirer.prompt(options) .then((response) => {
        console.log(response);
        let choice = response.userChoice;
        if (choice === "View all departments") {
            viewAllDepartments()
        }
    })
}

function viewAllDepartments () {
    pool.query('SELECT * FROM department', function (err, {rows}) {
        console.log(rows);
      });
}

init ()