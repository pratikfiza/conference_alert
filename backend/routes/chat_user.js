const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all chat users
router.get('/', (req, res) => {
  db.query('SELECT * FROM chat_user', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single chat user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM chat_user WHERE chat_user_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new chat user
router.post('/', (req, res) => {
  const { user_id, chat_room_id, joined_at } = req.body;
  db.query('INSERT INTO chat_user (user_id, chat_room_id, joined_at) VALUES (?, ?, ?)', [user_id, chat_room_id, joined_at], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a chat user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, chat_room_id, joined_at } = req.body;
  db.query('UPDATE chat_user SET user_id = ?, chat_room_id = ?, joined_at = ? WHERE chat_user_id = ?', [user_id, chat_room_id, joined_at, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a chat user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM chat_user WHERE chat_user_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
