const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "pratik12345",
    database: "demo"
});

// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
