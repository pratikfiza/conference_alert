const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all payments
router.get('/', (req, res) => {
  db.query('SELECT * FROM all_payment', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single payment by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM all_payment WHERE all_payment_auto_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new payment
router.post('/', (req, res) => {
  const { all_payment_id, transaction_for, event_id, bank_fee, actual_amount, amount, currency, name, email, phone, country, state, city, postal_code, address, date, status, val_code } = req.body;
  db.query('INSERT INTO all_payment (all_payment_id, transaction_for, event_id, bank_fee, actual_amount, amount, currency, name, email, phone, country, state, city, postal_code, address, date, status, val_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [all_payment_id, transaction_for, event_id, bank_fee, actual_amount, amount, currency, name, email, phone, country, state, city, postal_code, address, date, status, val_code], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update a payment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { all_payment_id, transaction_for, event_id, bank_fee, actual_amount, amount, currency, name, email, phone, country, state, city, postal_code, address, date, status, val_code } = req.body;
  db.query('UPDATE all_payment SET all_payment_id = ?, transaction_for = ?, event_id = ?, bank_fee = ?, actual_amount = ?, amount = ?, currency = ?, name = ?, email = ?, phone = ?, country = ?, state = ?, city = ?, postal_code = ?, address = ?, date = ?, status = ?, val_code = ? WHERE all_payment_auto_id = ?', [all_payment_id, transaction_for, event_id, bank_fee, actual_amount, amount, currency, name, email, phone, country, state, city, postal_code, address, date, status, val_code, id], (err, results) => {
    if (err) throw err;
    res.json({ id, ...req.body });
  });
});

// Delete a payment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM all_payment WHERE all_payment_auto_id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
