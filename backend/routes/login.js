const express = require('express');
const router = express.Router();
const db = require('../db');  // Adjust the path as necessary to match your project structure

// Create a new login
router.post('/', (req, res) => {
    const login = req.body;
    const sql = 'INSERT INTO login (list_id, user_id, password, user_type, status, token) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [login.list_id, login.user_id, login.password, login.user_type, login.status, login.token], (err, result) => {
        if (err) throw err;
        res.send('User login created...');
    });
});

// Read user login details
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM login WHERE list_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Update login details
router.put('/:id', (req, res) => {
    const updatedLogin = req.body;
    const sql = 'UPDATE login SET list_id = ?, user_id = ?, password = ?, user_type = ?, status = ?, token = ? WHERE list_id = ?';
    db.query(sql, [updatedLogin.list_id, updatedLogin.user_id, updatedLogin.password, updatedLogin.user_type, updatedLogin.status, updatedLogin.token, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User login updated...');
    });
});

// Delete a login
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM login WHERE list_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User login deleted...');
    });
});

module.exports = router;
