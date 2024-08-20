const express = require('express');
const router = express.Router();
const db = require('../db');


// Get all topics grouped by category
router.get('/topics', (req, res) => {
  const query = `
    SELECT ec.id AS category_id, ec.category, et.topic_id, et.topic 
    FROM event_topic et
    JOIN event_cat ec ON et.cat_id = ec.id
  `;
  
  db.query(query, (err, results) => {
    if (err) throw err;

    const groupedResults = results.reduce((acc, row) => {
      const { category_id, category, topic_id, topic } = row;

      if (!acc[category_id]) {
        acc[category_id] = { category_id, category, topics: [] };
      }

      acc[category_id].topics.push({ topic_id, topic });

      return acc;
    }, {});

    res.json(Object.values(groupedResults));
  });
});


// Get all event categories
router.get('/', (req, res) => {
  db.query('SELECT * FROM event_cat', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single event category by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM event_cat WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new event category
router.post('/', (req, res) => {
  const { category, position, delete_flag } = req.body;
  db.query('INSERT INTO event_cat (category, position, delete_flag) VALUES (?, ?, ?)', 
  [category, position, delete_flag], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update an event category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category, position, delete_flag } = req.body;
  db.query('UPDATE event_cat SET category = ?, position = ?, delete_flag = ? WHERE id = ?', 
  [category, position, delete_flag, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete an event category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM event_cat WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

// Get event topics by category ID
router.get('/:categoryId/event-topics', (req, res) => {
  const { categoryId } = req.params;
  db.query(
    'SELECT et.topic_id, et.topic, et.status FROM event_topic et JOIN event_cat ec ON et.cat_id = ec.id WHERE ec.id = ?',
    [categoryId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});



module.exports = router;
