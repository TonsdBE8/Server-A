const express = require('express');
const jsforce = require('jsforce');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// เชื่อมต่อกับ Salesforce
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        return console.error(err);
    }
    console.log('Connected to Salesforce');
});

// สร้าง API เรียกข้อมูลจาก Salesforce
app.get('/api/accounts', (req, res) => {
    conn.query('SELECT Id, Name FROM Account', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result.records);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});