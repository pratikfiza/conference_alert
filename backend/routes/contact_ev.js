const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all contacts
router.get('/', (req, res) => {
  db.query('SELECT * FROM contact_ev', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single contact by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM contact_ev WHERE contact_ev_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new contact
router.post('/', (req, res) => {
  const { name, email, message, created_at } = req.body;
  db.query('INSERT INTO contact_ev (name, email, message, created_at) VALUES (?, ?, ?, ?)', [name, email, message, created_at], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a contact
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, message, created_at } = req.body;
  db.query('UPDATE contact_ev SET name = ?, email = ?, message = ?, created_at = ? WHERE contact_ev_id = ?', [name, email, message, created_at, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a contact
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contact_ev WHERE contact_ev_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
