'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite');  // our connection to the sqlite database

const dropEmployees = () => {   // funtion to clear table
  db.run(`DROP TABLE employees`);
}
// dropEmployees()

const populateEmployees = () => {
  const { list } = require('./employees.json')  // pulling employees from neighboring json file

  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES (
      ${each.id},
      "${each.firstName}",
      "${each.lastName}",
      ${each.salary},
      "${each.weapon}"
    )`)
  })
}
// populateEmployees()


db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUMBER(7, 2), weapon TEXT)");

// // .get is not a very helpful method
// db.get(`SELECT * FROM employees`, (err, row) => {
//   console.log(row)
// })


//   // db.all() first runs the query
//   // then calls a callback function which it passes all resulting rows
// db.all("SELECT * FROM employees", (err, allRows) => {
//   // allRows is an array containing each row from the query
//   allRows.forEach(({ id, first, last, weapon, salary}) => {  // destructuring!!
//     console.log(`${id} ${first} ${last}. Weapon of choice: ${weapon}. Salary: ${salary}`)
//   })
// });


// // similar to db.all, but better for large databases
// // can use destructuring in the callback function
// db.each(`SELECT * FROM employees`, (err, { id, first, last, weapon, salary}) => {
//   console.log(`${id} ${first} ${last}. Weapon of choice: ${weapon}. Salary: ${salary}`)
// });


// ________challenge_____
  // 1. sort all records alphabetically by first name
// db.all("SELECT * FROM employees", (err, allRows) => {
//   let newArray = []
//   allRows.forEach((employee) => {
//     if (employee.salary > 50000) {
//       newArray.push(employee)
//     }
//   })
//   console.log(newArray)
// })
  // 2. create new array of all employees that make more than 50000
  // 3. using the new array, create an array of each persons first, last, and salary

//________solution from dom_________
// db.all("SELECT * FROM employees", (err, allRows) => {
//   const result = allRows.sort((a, b) => {
//     return (a.first > b.first) ? 1 : -1;
//   })
//   .filter(each => each.salary > 50000)
//   .map(each => `${each.first} ${each.last}. Salary: ${each.salary}`)

//   console.log(result)
// })

// _______solution using sql_________
db.all(`SELECT * FROM employees
        WHERE salary > 50000
        GROUP BY first`,
        (err, allRows) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log(allRows)
          }
})


// _________example inserts________
// db.run("INSERT INTO employees (id, first, last, salary) VALUES (1, 'Michael', 'Scott', 60000)");
// db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert', 45000)");
// db.run(`INSERT INTO employees VALUES (3, "Billy", "Conolly", 100000)`)
// employees TABLE
// id |  first    |   last    | salary
//  1 | 'Michael' | 'Scott'   |  60k
//  2 | 'Jim'     | 'Halpert' |  45k
