Express.js API with MySQL
This project is a simple RESTful API built with Express.js and MySQL. It allows you to perform CRUD (Create, Read, Update, Delete) operations on a database of items.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js
MySQL
Getting Started
Follow these steps to set up and run the project:

1. Clone the repository
bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Install dependencies
bash
Copy code
npm install
3. Set up the database
Open your MySQL client and create a new database:

sql
Copy code
CREATE DATABASE test_db;
Create the items table:

sql
Copy code
USE test_db;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
4. Configure the database connection
Open the db.js file and configure the MySQL connection settings:

js
Copy code
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'test_db'
});

// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
Replace your_password with your actual MySQL root password.

5. Start the server
bash
Copy code
node app.js
The server should now be running on http://localhost:3000.

API Endpoints
Create a new item
URL: /items

Method: POST

Body:

json
Copy code
{
    "name": "Item Name",
    "description": "Item Description"
}
Response:

json
Copy code
{
    "id": 1,
    "name": "Item Name",
    "description": "Item Description"
}
Get all items
URL: /items
Method: GET
Response:
json
Copy code
[
    {
        "id": 1,
        "name": "Item Name",
        "description": "Item Description"
    },
    ...
]
Get an item by ID
URL: /items/:id
Method: GET
Response:
json
Copy code
{
    "id": 1,
    "name": "Item Name",
    "description": "Item Description"
}
Update an item by ID
URL: /items/:id

Method: PUT

Body:

json
Copy code
{
    "name": "Updated Item Name",
    "description": "Updated Item Description"
}
Response:

json
Copy code
{
    "id": 1,
    "name": "Updated Item Name",
    "description": "Updated Item Description"
}
Delete an item by ID
URL: /items/:id
Method: DELETE
Response:
json
Copy code
"Item deleted"
Development
Nodemon
To facilitate development, you can use nodemon to automatically restart the server whenever you make changes to the code.

Install nodemon globally:

bash
Copy code
npm install -g nodemon
Start the server with nodemon:

bash
Copy code
nodemon app.js
Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.