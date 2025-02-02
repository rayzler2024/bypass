// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,        // Database host
    user: process.env.DB_USER,        // Database username
    password: process.env.DB_PASSWORD,// Database password
    database: process.env.DB_NAME,    // Database name
    port: process.env.DB_PORT || 3306 // Database port (default to 3306 if not set)
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// API Route to Fetch Data
app.get('/data', (req, res) => {
    db.query('SELECT * FROM your_table_name', (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

// API Route to Insert Data
app.post('/insert', (req, res) => {
    const { column1, column2 } = req.body;
    const sql = 'INSERT INTO your_table_name (column1, column2) VALUES (?, ?)';

    db.query(sql, [column1, column2], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: 'Data inserted successfully', id: result.insertId });
        }
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
