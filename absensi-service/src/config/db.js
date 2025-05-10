const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("Connecting to database...");
// Create a connection pool

const host = String(process.env.DB_HOST);
const user = String(process.env.DB_USER);
const password = String(process.env.DB_PASSWORD);
const database = String(process.env.DB_NAME);

if (!host || !user || !password || !database) {
  console.error("Database configuration is missing");
  process.exit(1);
}

const connection = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
});

connection.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});

module.exports = connection;
