const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all ad images
router.get('/', (req, res) => {
  db.query('SELECT * FROM ad_image', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single ad image by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM ad_image WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new ad image
router.post('/', (req, res) => {
  const { ad_type, hed, image, url, country, post_date, expire_date, status } = req.body;
  db.query('INSERT INTO ad_image (ad_type, hed, image, url, country, post_date, expire_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [ad_type, hed, image, url, country, post_date, expire_date, status], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update an ad image
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ad_type, hed, image, url, country, post_date, expire_date, status } = req.body;
  db.query('UPDATE ad_image SET ad_type = ?, hed = ?, image = ?, url = ?, country = ?, post_date = ?, expire_date = ?, status = ? WHERE id = ?', [ad_type, hed, image, url, country, post_date, expire_date, status, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete an ad image
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM ad_image WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
