const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all chat messages
router.get('/', (req, res) => {
  db.query('SELECT * FROM chat', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single chat message by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM chat WHERE chat_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new chat message
router.post('/', (req, res) => {
  const { sender_id, receiver_id, message, timestamp } = req.body;
  db.query('INSERT INTO chat (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, ?)', [sender_id, receiver_id, message, timestamp], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a chat message
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { sender_id, receiver_id, message, timestamp } = req.body;
  db.query('UPDATE chat SET sender_id = ?, receiver_id = ?, message = ?, timestamp = ? WHERE chat_id = ?', [sender_id, receiver_id, message, timestamp, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a chat message
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM chat WHERE chat_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
