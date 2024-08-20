const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db');

// Create a new organization
router.post('/', (req, res) => {
    const org = req.body;
    const insertSql = `
        INSERT INTO org_detail (contact_person_name, orginisation_name, logo, org_mail, org_pass, reg_date, status, val_code, report)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(insertSql, [
        org.contact_person_name,
        org.orginisation_name,
        org.logo,
        org.org_mail,
        org.org_pass,
        org.reg_date,
        org.status,
        org.val_code,
        org.report
    ], (err, result) => {
        if (err) {
            console.error("Error creating organization:", err);
            res.status(500).send("Failed to create organization");
            return;
        }

        const orgId = result.insertId; // Get the ID of the newly inserted organization
        const selectSql = 'SELECT * FROM org_detail WHERE org_id = ?';

        db.query(selectSql, [orgId], (err, results) => {
            if (err) {
                console.error("Error fetching created organization:", err);
                res.status(500).send("Failed to fetch created organization");
                return;
            }

            const createdOrg = results[0]; // Assuming the first row contains the newly created organization
            res.status(201).json(createdOrg); // Return organization details as JSON response
        });
    });
});

// Read organization details by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM org_detail WHERE org_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error fetching organization:", err);
            res.status(500).send("Failed to fetch organization");
            return;
        }

        if (result.length === 0) {
            res.status(404).send("Organization not found");
            return;
        }

        res.json(result[0]);
    });
});


router.put('/:id', (req, res) => {
    const { contact_person_name, orginisation_name, org_mail } = req.body;
    const sql = `
        UPDATE org_detail 
        SET contact_person_name = ?, orginisation_name = ?, org_mail = ? 
        WHERE org_id = ?`;

    db.query(sql, [
        contact_person_name,
        orginisation_name,
        org_mail,
        req.params.id
    ], (err, result) => {
        if (err) {
            console.error("Error updating organization:", err);
            res.status(500).send("Failed to update organization");
            return;
        }

        res.send('Organization updated successfully');
    });
});


// Delete an organization by ID
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM org_detail WHERE org_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting organization:", err);
            res.status(500).send("Failed to delete organization");
            return;
        }

        res.send('Organization deleted');
    });
});

module.exports = router;
