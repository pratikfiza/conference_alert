const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const secretKey = 'organizer_secret_key';

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

// Register route
router.post('/register', async (req, res) => {
  const { org_mail, org_pass } = req.body;
  const hashedPassword = await bcrypt.hash(org_pass, 10);

  db.query('INSERT INTO org_detail (org_mail, org_pass) VALUES (?, ?)', [org_mail, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(201).json({ message: 'User registered' });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { org_mail, org_pass } = req.body;

  db.query('SELECT * FROM org_detail WHERE org_mail = ?', [org_mail], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const organizer = results[0];
    let isMatch = false;
    if (org_pass === organizer.org_pass) {
      isMatch = true;
    }
    else if (await bcrypt.compare(org_pass, organizer.org_pass)) {
      isMatch = true;
    }


    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ id: organizer.org_id, email: organizer.org_mail }, secretKey, { expiresIn: '1000h' });
    res.json(
      {
        message: 'Authentication successful',
        token,
        user: {
          id: organizer.org_id,
          email: organizer.org_mail
        }
      }
    );
  });
});

// Get all organizers
router.get('/', isAuthenticated, (req, res) => {
  db.query('SELECT * FROM org_detail', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database query error' });
    }
    res.json(results);
  });
});

// Change password
router.post('/change-password', async (req, res) => {
  const { old_password, new_password } = req.body;

  db.query('SELECT * FROM org_detail WHERE org_id = ?', [req.user.id], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const organizer = results[0];
    const isMatch = await bcrypt.compare(old_password, organizer.org_pass);

    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    db.query('UPDATE org_detail SET org_pass = ? WHERE org_id = ?', [hashedPassword, req.user.id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Password change failed' });
      }
      res.json({ message: 'Password changed successfully' });
    });
  });
});

module.exports = router;
