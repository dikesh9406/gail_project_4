const { Pool } = require("pg");
// import {Pool} from "pg";

const pool = new Pool({
  user: "postgres",
  password: "123456789",
  host: "localhost",
  port: 5001,
  database: "postgres",
});

const createTblQry = `CREATE TABLE IF NOT EXISTS test_table2(
    
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) UNIQUE NOT NULL);`;

const insertUserQry = `INSERT INTO test_table2 (user_name, password) VALUES ('aman', '12345');`;

pool.query(createTblQry)
  .then(() => {
    console.log("Table created.");

    pool.query(insertUserQry)
      .then(() => {
        console.log("User inserted.");
      })
      .catch((error) => {
        console.error("Error inserting user:", error);
      });
 

module.exports = pool;
