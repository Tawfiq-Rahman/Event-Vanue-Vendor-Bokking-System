const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Pulls in your MySQL connection

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// ==========================================
// 1. REGISTER ROUTE
// ==========================================
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Customers are approved instantly; Venue Owners & Vendors must wait for Admin
    const initialStatus = role === 'customer' ? 'approved' : 'pending';

    // Insert new user into MySQL
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, status, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, initialStatus, phone || '']
    );

    // If registered as a vendor, create an initial vendor profile record
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
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 2. LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. FIRST check: Does this email exist in the database at all?
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      // If the email is not in the database, tell them to register
      return res.status(400).json({ message: 'Account not found. Please register first.' });
    }

    const user = users[0];

    // 2. SECOND check: Did they select the correct portal for their account type?
    if (user.role !== role) {
      // Format the role name nicely (e.g., 'venue_owner' -> 'venue owner')
      const correctPortal = user.role.replace('_', ' ');
      return res.status(400).json({ message: `Incorrect portal. Please log in through the ${correctPortal} tab.` });
    }
    
    // 3. THIRD check: Is the password correct?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    // ---> ADMIN APPROVAL CHECK <---
    if (user.status === 'pending') {
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }
    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account registration was rejected.' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send successful response
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
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;