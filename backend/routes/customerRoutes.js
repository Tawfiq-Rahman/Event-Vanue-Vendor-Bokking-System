const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db'); 
const multer = require('multer');
const path = require('path');

// Configure Multer for local profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/profiles/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user; // attach decoded user data (like id) to the request
    next();
  });
};

// ==========================================
// 1. GET ALL BOOKINGS FOR CUSTOMER
// ==========================================
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    
    // Join bookings with venues to get venue title
    const query = `
      SELECT b.id, b.event_date, b.booking_status as status, b.total_amount as total, b.advance_paid as paid, v.title as venueName 
      FROM bookings b 
      JOIN venues v ON b.venue_id = v.id 
      WHERE b.customer_id = ?
      ORDER BY b.event_date DESC
    `;
    
    const [bookings] = await db.query(query, [customerId]);
    
    // Map the database rows to the format expected by the frontend
    const formattedBookings = bookings.map(b => {
      return {
        id: `BKG-${b.id.toString().padStart(3, '0')}`, // Example: BKG-001
        rawId: b.id, // Keep the real ID for API calls
        venueName: b.venueName,
        // Format date string from DB
        date: new Date(b.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
        status: b.status.charAt(0).toUpperCase() + b.status.slice(1), // Capitalize
        total: `$${Number(b.total).toLocaleString()}`,
        paid: `$${Number(b.paid).toLocaleString()}`
      };
    });

    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// ==========================================
// 2. PAY ADVANCE FOR A BOOKING
// ==========================================
router.put('/bookings/:id/pay', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const bookingId = req.params.id;

    // Fetch current booking total to calculate advance (let's say 50%)
    const [bookings] = await db.query(
      'SELECT total_amount FROM bookings WHERE id = ? AND customer_id = ? AND booking_status = "pending"', 
      [bookingId, customerId]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Pending booking not found.' });
    }

    const totalAmount = bookings[0].total_amount;
    const advanceAmount = totalAmount / 2; // 50% advance

    // Update the booking status to confirmed and set the advance paid
    await db.query(
      'UPDATE bookings SET advance_paid = ?, booking_status = "confirmed" WHERE id = ?',
      [advanceAmount, bookingId]
    );

    res.status(200).json({ message: 'Payment successful! Booking confirmed.' });
  } catch (error) {
    console.error("Error paying advance:", error);
    res.status(500).json({ message: 'Server error during payment' });
  }
});

// ==========================================
// 3. GET CUSTOMER PROFILE
// ==========================================
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [customerId]
    );
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// ==========================================
// 4. UPDATE CUSTOMER PROFILE
// ==========================================
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const { name, email, phone, dob, address, profile_picture } = req.body;

    await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, address = ?, profile_picture = ? WHERE id = ?',
      [name, email, phone || '', dob || null, address || '', profile_picture || null, customerId]
    );

    // Fetch updated user to return to frontend
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [customerId]
    );

    res.status(200).json({ message: 'Profile updated successfully!', user: users[0] });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// ==========================================
// 4.5. UPLOAD CUSTOMER PROFILE PICTURE
// ==========================================
router.post('/profile/upload', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const customerId = req.user.id;
    // Generate the URL to access the uploaded file
    const profilePictureUrl = `http://localhost:5000/uploads/profiles/${req.file.filename}`;

    // Update the database with the new URL
    await db.query(
      'UPDATE users SET profile_picture = ? WHERE id = ?',
      [profilePictureUrl, customerId]
    );

    // Fetch updated user to return to frontend
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [customerId]
    );

    res.status(200).json({ 
      message: 'Profile picture uploaded successfully!', 
      profile_picture: profilePictureUrl,
      user: users[0]
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: 'Server error during picture upload' });
  }
});

// ==========================================
// 5. CHANGE CUSTOMER PASSWORD
// ==========================================
router.put('/password', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required.' });
    }

    // Fetch current user's password
    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [customerId]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });

    const user = users[0];

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password.' });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, customerId]);

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: 'Server error during password update' });
  }
});

module.exports = router;
