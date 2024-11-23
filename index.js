const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD ,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME
  },
  console.log('Connected to the courses_db database!')
  )
  
  pool.connect(); 
  let options = [{
    type: 'list',
    message: 'Select any option from below:',
    name: 'userChoice',
    choices: [
      "View all departments", 
      "View all roles", 
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role"
    ]
  }]

function init () {
    inquirer.prompt(options) .then((response) => {
        console.log(response);
        let choice = response.userChoice;
        if (choice === "View all departments") {
          viewAllDepartments()
        }
        else if (choice === "View all roles") {
          viewAllRoles()
        }
        else if (choice === "View all employees") {
          viewAllEmployees()
        }
        else if (choice === "Add a department") {
          addDepartment()
        }
        else if (choice === "Add a role") {
          addRole()
        }
        else if (choice === "Add an employee") {
          addEmployee()
        }
    })
}

function viewAllDepartments () {
    pool.query('SELECT * FROM department', function (err, {rows}) {
        console.log(rows);
      init ()
      });
}

function viewAllRoles () {
  pool.query('SELECT * FROM role', function (err, {rows}) {
      console.log(rows);
      init ()
    });
}

function viewAllEmployees () {
  pool.query('SELECT * FROM employee', function (err, {rows}) {
      console.log(rows);
      init ()
    });
}

function addDepartment () {
  let questions = [{
    type: 'input',
      name: 'name',
      message: ('What will the new department`s name be?'),
  }]

  inquirer.prompt(questions).then((response) => {
    pool.query('INSERT INTO department (name) VALUES($1);', [response.name], function (err, {rows}) {
      console.log(rows);
      // Ask the initial question again
      init ()
  })
})
}

function addRole () {
  let questions = [
    {
    type: 'input',
      name: 'title',
      message: ('What will the new role`s title be?'),
    },
    {
    type: 'input',
      name: 'salary',
      message: ('What will the new role`s salary be?'),
    },
    {
    type: 'input',
      name: 'department_id',
      message: ('What will the new role`s department ID be?'),
    }
]

  inquirer.prompt(questions).then((response) => {
    pool.query('INSERT INTO role (title, salary, department_id) VALUES($1, $2, $3);', [response.title, response.salary, response.department_id], function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(data);
      // Ask the initial question again
      init ()
  })
})
  
}

function addEmployee () {
  let questions = [
    {
    type: 'input',
      name: 'first_name',
      message: ('What is the new employee`s first name?'),
    },
    {
    type: 'input',
      name: 'last_name',
      message: ('What is the new employee`s last name?'),
    },
    {
    type: 'input',
      name: 'role_id',
      message: ('What will the new employee`s role ID be?'),
    },
    {
    type: 'input',
      name: 'manager_id',
      message: ('What will the new employee`s manager ID be?'),
    }
]

  inquirer.prompt(questions).then((response) => {
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4);', [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(data);
      // Ask the initial question again
      init ()
  })
})
  
}
init ()