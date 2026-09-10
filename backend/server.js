const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// 1. Health check
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'success', message: 'Backend connected to MySQL successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Register API
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Customers are approved by default; Venue Owners & Vendors require admin approval
    const initialStatus = role === 'customer' ? 'approved' : 'pending';

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, status, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, initialStatus, phone || '']
    );

    // If registered as vendor, create initial vendor profile record
    if (role === 'vendor') {
      await db.query(
        'INSERT INTO vendors (user_id, service_type, portfolio_description, starting_rate) VALUES (?, ?, ?, ?)',
        [result.insertId, 'catering', 'Default portfolio', 0.00]
      );
    }

    res.status(201).json({
      message: 'Registration successful!',
      userId: result.insertId,
      status: initialStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Login API
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    if (user.status === 'pending') {
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }
    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account registration was rejected.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));