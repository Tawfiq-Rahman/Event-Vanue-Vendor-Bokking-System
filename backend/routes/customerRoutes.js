const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db'); 
const multer = require('multer');
const path = require('path');
const PDFDocument = require('pdfkit');

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

// ==========================================
// 6. SEARCH VENUES
// ==========================================
router.get('/venues/search', authenticateToken, async (req, res) => {
  try {
    const { date, capacity, maxBudget } = req.query;
    let query = 'SELECT v.*, u.name as owner_name FROM venues v JOIN users u ON v.owner_id = u.id WHERE 1=1';
    const queryParams = [];

    if (capacity) {
      query += ' AND v.capacity >= ?';
      queryParams.push(Number(capacity));
    }
    if (maxBudget) {
      query += ' AND v.price_per_day <= ?';
      queryParams.push(Number(maxBudget));
    }
    // Simple availability check: Venue is not booked on that date
    if (date) {
      query += ' AND v.id NOT IN (SELECT venue_id FROM bookings WHERE event_date = ? AND booking_status != "cancelled")';
      queryParams.push(date);
    }

    const [venues] = await db.query(query, queryParams);
    res.json(venues);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
});

// ==========================================
// 7. GET VENDORS
// ==========================================
router.get('/vendors', authenticateToken, async (req, res) => {
  try {
    const [vendors] = await db.query('SELECT v.*, u.name as vendor_name FROM vendors v JOIN users u ON v.user_id = u.id');
    res.json(vendors);
  } catch (error) {
    console.error('Vendor fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 8. CREATE BOOKING
// ==========================================
router.post('/bookings', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const { venue_id, event_date, guest_count, total_amount, vendor_ids } = req.body;

    const [result] = await db.query(
      'INSERT INTO bookings (customer_id, venue_id, event_date, guest_count, total_amount, booking_status) VALUES (?, ?, ?, ?, ?, "pending")',
      [customerId, venue_id, event_date, guest_count, total_amount]
    );

    const bookingId = result.insertId;

    if (vendor_ids && vendor_ids.length > 0) {
      for (const v of vendor_ids) {
        await db.query(
          'INSERT INTO booking_vendors (booking_id, vendor_id, cost) VALUES (?, ?, ?)',
          [bookingId, v.id, v.cost]
        );
      }
    }

    res.status(201).json({ message: 'Booking created successfully!', bookingId });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// ==========================================
// 9. SUBMIT REVIEW
// ==========================================
router.post('/reviews', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const { venue_id, vendor_id, rating, comment } = req.body;
    
    await db.query(
      'INSERT INTO reviews (customer_id, venue_id, vendor_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [customerId, venue_id || null, vendor_id || null, rating, comment]
    );

    res.json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 10. CHAT MESSAGES
// ==========================================
router.get('/messages/:partnerId', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const partnerId = req.params.partnerId;

    const [messages] = await db.query(
      'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at ASC',
      [customerId, partnerId, partnerId, customerId]
    );
    res.json(messages);
  } catch (error) {
    console.error('Message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/messages', authenticateToken, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiver_id, message } = req.body;

    await db.query(
      'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
      [senderId, receiver_id, message]
    );
    res.json({ message: 'Message sent' });
  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 11. GET CHAT CONTACTS (Owners & Vendors involved in bookings)
// ==========================================
router.get('/chat-contacts', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    
    // Get unique owners
    const [owners] = await db.query(`
      SELECT DISTINCT u.id, u.name, u.role, u.profile_picture 
      FROM bookings b 
      JOIN venues v ON b.venue_id = v.id 
      JOIN users u ON v.owner_id = u.id 
      WHERE b.customer_id = ?
    `, [customerId]);

    // Get unique vendors
    const [vendors] = await db.query(`
      SELECT DISTINCT u.id, u.name, u.role, u.profile_picture 
      FROM bookings b 
      JOIN booking_vendors bv ON b.id = bv.booking_id
      JOIN vendors ven ON bv.vendor_id = ven.id
      JOIN users u ON ven.user_id = u.id 
      WHERE b.customer_id = ?
    `, [customerId]);

    const contacts = [...owners, ...vendors];
    // Remove duplicates if a user is somehow both
    const uniqueContacts = Array.from(new Map(contacts.map(item => [item.id, item])).values());
    
    res.json(uniqueContacts);
  } catch (error) {
    console.error('Chat contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 12. GENERATE BOOKING INVOICE (PDF)
// ==========================================
router.get('/bookings/:id/invoice', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const bookingId = req.params.id;

    const [bookings] = await db.query(`
      SELECT b.*, v.title as venue_name, v.price_per_day, u.name as customer_name, u.email 
      FROM bookings b 
      JOIN venues v ON b.venue_id = v.id 
      JOIN users u ON b.customer_id = u.id
      WHERE b.id = ? AND b.customer_id = ?
    `, [bookingId, customerId]);

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bookings[0];

    const [vendors] = await db.query(`
      SELECT bv.cost, ven.service_type, u.name as vendor_name 
      FROM booking_vendors bv
      JOIN vendors ven ON bv.vendor_id = ven.id
      JOIN users u ON ven.user_id = u.id
      WHERE bv.booking_id = ?
    `, [bookingId]);

    const doc = new PDFDocument({ margin: 50 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice_BKG-${bookingId.toString().padStart(3, '0')}.pdf"`);
    
    doc.pipe(res);
    
    doc.fontSize(25).font('Helvetica-Bold').text('EventHub Invoice', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).font('Helvetica-Bold').text(`Invoice #BKG-${bookingId.toString().padStart(3, '0')}`);
    doc.font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    
    doc.font('Helvetica-Bold').text('Billed To:');
    doc.font('Helvetica').text(booking.customer_name);
    doc.text(booking.email);
    doc.moveDown();
    
    doc.font('Helvetica-Bold').text('Booking Details:');
    doc.font('Helvetica').text(`Venue: ${booking.venue_name}`);
    doc.text(`Event Date: ${new Date(booking.event_date).toLocaleDateString()}`);
    doc.text(`Guests: ${booking.guest_count}`);
    doc.text(`Status: ${booking.booking_status.toUpperCase()}`);
    doc.moveDown();
    
    doc.font('Helvetica-Bold').text('Charges:', { underline: true });
    doc.moveDown(0.5);
    
    doc.font('Helvetica').text(`Venue Rental (${booking.venue_name}): $${booking.price_per_day}`);
    
    let totalVendors = 0;
    vendors.forEach(v => {
      doc.text(`${v.service_type.toUpperCase()} - ${v.vendor_name}: $${v.cost}`);
      totalVendors += Number(v.cost);
    });
    
    doc.moveDown();
    doc.font('Helvetica-Bold').text(`Total Amount: $${booking.total_amount}`);
    doc.text(`Advance Paid: $${booking.advance_paid}`);
    doc.text(`Balance Due: $${(booking.total_amount - booking.advance_paid).toFixed(2)}`);
    
    doc.moveDown(4);
    doc.fontSize(10).fillColor('gray').text('Thank you for choosing EventHub!', { align: 'center' });
    
    doc.end();
  } catch (error) {
    console.error("PDF Error:", error);
    res.status(500).json({ message: 'Error generating invoice' });
  }
});

module.exports = router;

// ==========================================
// 6. GET CUSTOMER BOOKINGS (Upcoming/Actionable)
// ==========================================
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const query = `
      SELECT b.id as rawId, CONCAT('BKG-', LPAD(b.id, 3, '0')) as id, 
             DATE_FORMAT(b.event_date, '%b %d, %Y') as date, 
             b.booking_status as status, 
             CONCAT('$', FORMAT(b.total_amount, 0)) as total, 
             CONCAT('$', FORMAT(b.advance_paid, 0)) as paid,
             v.title as venueName
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.customer_id = ? 
        AND (b.booking_status NOT IN ('rejected', 'cancelled', 'completed') 
             OR (b.booking_status IN ('rejected', 'cancelled') AND b.customer_seen = 0))
      ORDER BY b.event_date DESC
    `;
    const [bookings] = await db.query(query, [customerId]);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

// ==========================================
// 7. GET CUSTOMER HISTORY (Completed/Cancelled)
// ==========================================
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    const query = `
      SELECT b.id as rawId, CONCAT('BKG-', LPAD(b.id, 3, '0')) as id, 
             DATE_FORMAT(b.event_date, '%b %d, %Y') as date, 
             b.booking_status as status, 
             CONCAT('$', FORMAT(b.total_amount, 0)) as total, 
             CONCAT('$', FORMAT(b.advance_paid, 0)) as paid,
             v.title as venueName
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.customer_id = ? 
        AND (b.booking_status = 'completed' 
             OR (b.booking_status IN ('rejected', 'cancelled') AND b.customer_seen = 1))
      ORDER BY b.event_date DESC
    `;
    const [bookings] = await db.query(query, [customerId]);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching customer history:", error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});

// ==========================================
// 8. MARK CUSTOMER BOOKINGS AS SEEN
// ==========================================
router.put('/bookings/mark-seen', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id;
    await db.query(`
      UPDATE bookings 
      SET customer_seen = 1 
      WHERE customer_id = ? AND booking_status IN ('rejected', 'cancelled') AND customer_seen = 0
    `, [customerId]);
    res.status(200).json({ message: 'Marked as seen' });
  } catch (error) {
    console.error("Error marking seen:", error);
    res.status(500).json({ message: 'Server error' });
  }
});
