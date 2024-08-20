// routes/subscribe.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      university,
      designation,
      country,
      state,
      city,
      category,
      interests
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO subscribe (submitter, email_name, emails, university, email_desig, country, state, city, primary_topic, secondary_topic, date, status, val_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        'SUBSCRIBER',
        first_name + ' ' + last_name,
        email,
        university,
        designation,
        country,
        state,
        city,
        category,
        JSON.stringify(interests),
        new Date(),
        'Pending',
        'some_validation_code'
      ]
    );

    res.status(201).json({ message: 'Subscription created', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
