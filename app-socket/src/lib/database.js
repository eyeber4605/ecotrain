const mysql = require('mysql');

const database = {
    "host" : process.env.DB_host,
    "user" : process.env.DB_user,
    "password" : process.env.DB_password,
    "database" : process.env.DB_database,
}
const db = mysql.createConnection(database);

db.connect();

module.exports = db;