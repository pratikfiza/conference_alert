const express = require('express');
const router = express.Router();
const db = require('../db');

const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

router.get('/', async (req, res) => {
  const { country, category, topic } = req.query;

  let query = `
    SELECT e.*
    FROM event e
    WHERE 1 = 1
    AND e.status IN ('Accept', 'New')
    AND e.event_stat > CURDATE()


  `;
  
  const queryParams = [];


  if (country) {
    query += ' AND (e.city LIKE ? OR e.country LIKE ?)';
    queryParams.push(`%${country}%`, `%${country}%`); 
   }

    if (category) {
      query += ' AND et.cat_id = ?';
      queryParams.push(category);
    }
  
    
  if (topic) {
    query += ' AND et.topic = ?';
    queryParams.push(topic);
  }

  try {
    const events = await queryAsync(query, queryParams);
    res.json(events);
    console.log('Query:', query);
    console.log('Query Params:', queryParams);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send(err);
  }
});

module.exports = router;