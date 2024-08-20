// routes/event_keywords.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const categoriesQuery = 'SELECT * FROM event_cat WHERE delete_flag = 0';

  db.query(categoriesQuery, (err, categories) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).send('Server error');
    }

    const categoryKeywords = {};
    let remainingCategories = categories.length;

    if (remainingCategories === 0) {
      return res.json(categoryKeywords);
    }

    categories.forEach((category) => {
      const keywordsQuery = `
        SELECT et.topic 
        FROM event_keyword ek 
        JOIN event_topic et ON ek.keywords = et.topic_id 
        WHERE et.cat_id = ?
      `;

      db.query(keywordsQuery, [category.id], (err, keywords) => {
        if (err) {
          console.error('Error fetching keywords:', err);
          return res.status(500).send('Server error');
        }

        categoryKeywords[category.category] = keywords.map(keyword => keyword.topic);

        remainingCategories -= 1;
        if (remainingCategories === 0) {
          res.json(categoryKeywords);
        }
      });
    });
  });
});

module.exports = router;
