// routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const categoriesQuery = 'SELECT * FROM event_cat WHERE delete_flag = 0';
    const topicsQuery = 'SELECT * FROM event_topic WHERE status = "SHOW"';

    db.query(categoriesQuery, (error, categories) => {
        if (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).send('Server error');
        }

        db.query(topicsQuery, (error, topics) => {
            if (error) {
                console.error('Error fetching topics:', error);
                return res.status(500).send('Server error');
            }

            const categoryTopics = categories.map(category => {
                return {
                    ...category,
                    topics: topics.filter(topic => topic.cat_id === category.id)
                };
            });

            res.json(categoryTopics);
        });
    });
});

module.exports = router;
