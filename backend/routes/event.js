const express = require('express');
const router = express.Router();
const db = require('../db');


// Get accepted events
router.get('/accepted', (req, res) => {
  db.query('SELECT * FROM event WHERE status = "Accept"', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Get rejected events
router.get('/rejected', (req, res) => {
  db.query('SELECT * FROM event WHERE status = "Temporary Reject"', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Get past successful events
router.get('/past-successful', (req, res) => {
  const currentDate = new Date().toISOString();
  db.query('SELECT * FROM event WHERE status = "Accept" AND event_end < ?', [currentDate], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Get events in process of verification
router.get('/verification', (req, res) => {
  db.query('SELECT * FROM event WHERE status = "Pending"', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Get all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM event ORDER BY event_stat ASC LIMIT 25', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Get a single event by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM event WHERE event_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const {
    org_id, event_topic, event_type, event_name, country, state, city, org_society,
    contact_person_event, event_enq_email, web_url, event_stat, event_end,
    abstract_deadline, short_desc, keywords, date_post, status, message,
    reason,  venue
  } = req.body;

  // Convert keywords to a JSON string
  const keywordsJson = JSON.stringify(keywords);

  db.query(
    `INSERT INTO event ( 
      org_id, event_topic, event_type, event_name, country, state, city, org_society,
      contact_person_event, event_enq_email, web_url, event_stat, event_end,
      abstract_deadline, short_desc, keywords, date_post, status, message,
      reason, venue
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      org_id, event_topic, event_type, event_name, country, state, city, org_society,
      contact_person_event, event_enq_email, web_url, event_stat, event_end,
      abstract_deadline, short_desc, keywordsJson, date_post, status, message,
      reason, venue
    ],
    (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ error: 'Database insert error' });
      }
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});


// Update an event 
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    org_id, event_topic, event_type, event_name, country, state, city, org_society,
    contact_person_event, event_enq_email, web_url, event_stat, event_end,
    abstract_deadline, short_desc, keywords, date_post, status, message,
    reason, reg_counter, venue
  } = req.body;

  db.query(
    `UPDATE event SET
      org_id = ?, event_topic = ?, event_type = ?, event_name = ?, country = ?,
      state = ?, city = ?, org_society = ?, contact_person_event = ?, event_enq_email = ?,
      web_url = ?, event_stat = ?, event_end = ?, abstract_deadline = ?, short_desc = ?,
      keywords = ?, date_post = ?, status = ?, message = ?, reason = ?, venue = ?
    WHERE event_id = ?`,
    [
      org_id, event_topic, event_type, event_name, country, state, city, org_society,
      contact_person_event, event_enq_email, web_url, event_stat, event_end,
      abstract_deadline, short_desc, keywords, date_post, status, message,
      reason, venue, id
    ],
    (err, results) => {
      if (err) {
        console.error('Database update error:', err);
        return res.status(500).json({ error: 'Database update error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json({ id, ...req.body });
    }
  );
});

// Delete an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM event WHERE event_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database delete error:', err);
      return res.status(500).json({ error: 'Database delete error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(204).send();
  });
});

// Get the 8 latest upcoming events
router.get('/latest/upcoming', (req, res) => {
  const currentDate = new Date().toISOString();
  db.query(
    'SELECT * FROM event WHERE event_stat >= ? ORDER BY event_stat ASC LIMIT 8',
    [currentDate],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
    }
  );
});



module.exports = router;
