'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite');  // our connection to the sqlite database

console.log(db)
