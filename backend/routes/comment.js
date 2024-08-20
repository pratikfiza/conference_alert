const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all comments
router.get('/', (req, res) => {
  db.query('SELECT * FROM comment', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single comment by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM comment WHERE comment_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new comment
router.post('/', (req, res) => {
  const { blog_id, user_id, content, created_at } = req.body;
  db.query('INSERT INTO comment (blog_id, user_id, content, created_at) VALUES (?, ?, ?, ?)', [blog_id, user_id, content, created_at], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a comment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { blog_id, user_id, content, created_at } = req.body;
  db.query('UPDATE comment SET blog_id = ?, user_id = ?, content = ?, created_at = ? WHERE comment_id = ?', [blog_id, user_id, content, created_at, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM comment WHERE comment_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
