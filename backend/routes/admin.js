const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all admins
router.get('/', (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single admin by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new admin
router.post('/', (req, res) => {
  const { user_id, password, status } = req.body;
  db.query('INSERT INTO admin (user_id, password, status) VALUES (?, ?, ?)', [user_id, password, status], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update an admin
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, password, status } = req.body;
  db.query('UPDATE admin SET user_id = ?, password = ?, status = ? WHERE id = ?', [user_id, password, status, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete an admin
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM admin WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
