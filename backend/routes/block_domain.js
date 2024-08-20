const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all blocked domains
router.get('/', (req, res) => {
  db.query('SELECT * FROM block_domain', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single blocked domain by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM block_domain WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new blocked domain
router.post('/', (req, res) => {
  const { domain_name } = req.body;
  db.query('INSERT INTO block_domain (domain_name) VALUES (?)', [domain_name], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a blocked domain
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { domain_name } = req.body;
  db.query('UPDATE block_domain SET domain_name = ? WHERE id = ?', [domain_name, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a blocked domain
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM block_domain WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
