const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({ connectionString: 'postgresql://username:password@localhost/dbname' });

app.use(bodyParser.json());
app.use(cors());

// Authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) return res.status(401).send('User not found');
    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(401).send('Invalid password');
    const token = jwt.sign({ id: user.rows[0].id }, 'secret_key');
    res.json({ token });
});

// Fetch cases
app.get('/cases', async (req, res) => {
    const cases = await pool.query('SELECT * FROM cases');
    res.json(cases.rows);
});

// Approve order
app.post('/orders/:id/approve', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['Approved', id]);
    res.send('Order Approved');
});

app.listen(3000, () => console.log('Server running on port 3000'));
