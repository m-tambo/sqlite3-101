'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite');  // our connection to the sqlite database

const dropEmployees = () => {   // funtion to clear table
  db.run(`DROP TABLE employees`);
}
// dropEmployees()

const populateEmployees () => {


}

db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUMBER(7, 2))");






// db.run("INSERT INTO employees (id, first, last, salary) VALUES (1, 'Michael', 'Scott', 60000)");
// db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert', 45000)");
// db.run(`INSERT INTO employees VALUES (3, "Billy", "Conolly", 100000)`)
// employees TABLE
// id |  first    |   last    | salary
//  1 | 'Michael' | 'Scott'   |  60k
//  2 | 'Jim'     | 'Halpert' |  45k
