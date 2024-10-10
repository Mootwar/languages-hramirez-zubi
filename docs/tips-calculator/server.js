const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize the app and PostgreSQL connection pool
const app = express();
const pool = new Pool({
    user: 'hramirez',
    host: 'localhost',
    database: 'tip_calculator',
    password: 'password',
    port: 5432
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' folder

// Endpoint to calculate tip and save to PostgreSQL
app.post('/calculate', async (req, res) => {
    const { billAmount, tipPercentage } = req.body;

    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage);
    const tipAmount = (bill * tipPercent) / 100;
    const totalAmount = bill + tipAmount;

    try {
        const result = await pool.query(
            'INSERT INTO tip_calculations (bill_amount, tip_percentage, tip_amount, total_amount) VALUES ($1, $2, $3, $4) RETURNING *',
            [bill, tipPercent, tipAmount, totalAmount]
        );
        res.json({
            success: true,
            calculation: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
