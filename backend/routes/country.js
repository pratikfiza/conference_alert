const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all countries
router.get('/', (req, res) => {
  db.query('SELECT * FROM country', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single country by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM country WHERE country_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new country
router.post('/', (req, res) => {
  const { country_name, country_code } = req.body;
  db.query('INSERT INTO country (country_name, country_code) VALUES (?, ?)', [country_name, country_code], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a country
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { country_name, country_code } = req.body;
  db.query('UPDATE country SET country_name = ?, country_code = ? WHERE country_id = ?', [country_name, country_code, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a country
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM country WHERE country_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
