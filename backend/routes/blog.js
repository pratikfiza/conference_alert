const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all blogs
router.get('/', (req, res) => {
  db.query('SELECT * FROM blog', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single blog by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM blog WHERE blog_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new blog
router.post('/', (req, res) => {
  const { title, content, author, created_at, updated_at } = req.body;
  db.query('INSERT INTO blog (title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [title, content, author, created_at, updated_at], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a blog
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author, created_at, updated_at } = req.body;
  db.query('UPDATE blog SET title = ?, content = ?, author = ?, created_at = ?, updated_at = ? WHERE blog_id = ?', [title, content, author, created_at, updated_at, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a blog
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM blog WHERE blog_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
