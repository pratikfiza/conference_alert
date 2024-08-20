// routes/promote.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/upcoming', async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

  const query = `
    SELECT p.promote_id, p.banner, e.event_id, e.event_name, e.event_stat, e.event_end, e.country, e.city, e.short_desc
    FROM promote p
    JOIN event e ON p.event_id = e.event_id
    WHERE p.exp_date >= ?
    ORDER BY p.exp_date ASC
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [today], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    res.json(results);
  } catch (err) {
    console.error('Error fetching upcoming events:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
