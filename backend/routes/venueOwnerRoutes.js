const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const path = require('path');

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

const venueStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'venue-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const uploadVenueImage = multer({ storage: venueStorage });

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    if (user.role !== 'venue_owner') return res.status(403).json({ message: 'Access denied. Venue Owners only.' });
    req.user = user;
    next();
  });
};

// ==========================================
// 1. GET VENUE OWNER BASIC USER PROFILE
// ==========================================
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const venueOwnerId = req.user.id;
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [venueOwnerId]
    );
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// ==========================================
// 2. UPDATE VENUE OWNER BASIC USER PROFILE
// ==========================================
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const venueOwnerId = req.user.id;
    const { name, email, phone, dob, address, profile_picture } = req.body;

    await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, address = ?, profile_picture = ? WHERE id = ?',
      [name, email, phone || '', dob || null, address || '', profile_picture || null, venueOwnerId]
    );

    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [venueOwnerId]
    );

    res.status(200).json({ message: 'Profile updated successfully!', user: users[0] });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// ==========================================
// 3. UPLOAD VENUE OWNER PROFILE PICTURE
// ==========================================
router.post('/profile/upload', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const venueOwnerId = req.user.id;
    // Generate the URL to access the uploaded file
    const profilePictureUrl = `http://localhost:5000/uploads/profiles/${req.file.filename}`;

    // Update the database with the new URL
    await db.query(
      'UPDATE users SET profile_picture = ? WHERE id = ?',
      [profilePictureUrl, venueOwnerId]
    );

    // Fetch updated user to return to frontend
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [venueOwnerId]
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
// 4. CHANGE VENUE OWNER PASSWORD
// ==========================================
router.put('/password', authenticateToken, async (req, res) => {
  try {
    const venueOwnerId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required.' });
    }

    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [venueOwnerId]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });

    const user = users[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, venueOwnerId]);

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: 'Server error during password update' });
  }
});

// ==========================================
// 5. GET ALL VENUES FOR OWNER
// ==========================================
router.get('/venues', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const [venues] = await db.query('SELECT * FROM venues WHERE owner_id = ? ORDER BY created_at DESC', [ownerId]);
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: 'Server error fetching venues' });
  }
});

// ==========================================
// 6. CREATE A NEW VENUE
// ==========================================
router.post('/venues', authenticateToken, uploadVenueImage.single('image_file'), async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { title, description, location, capacity, price_per_day, packages } = req.body;
    let image_url = req.body.image_url;
    
    // If a file was uploaded, use the server URL for the image
    if (req.file) {
      image_url = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    
    // Fallback to a blurry ash picture
    const img = image_url || 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=600';
    
    const query = 'INSERT INTO venues (owner_id, title, description, location, capacity, price_per_day, image_url, packages) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [ownerId, title, description, location, capacity, price_per_day, img, packages]);
    
    res.status(201).json({ message: 'Venue created successfully' });
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ message: 'Server error creating venue' });
  }
});

// ==========================================
// 7. GET BOOKINGS FOR OWNER'S VENUES
// ==========================================
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const query = `
      SELECT b.id, b.event_date, b.guest_count, b.total_amount as total_price, 
             IF(b.advance_paid >= b.total_amount, 'full_paid', IF(b.advance_paid > 0, 'advance_paid', 'pending')) as payment_status, 
             b.booking_status as status, b.created_at,
             v.title as venue_name, v.location,
             u.name as customer_name, u.phone as customer_phone
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE v.owner_id = ? AND b.booking_status = 'pending'
      ORDER BY b.event_date DESC
    `;
    const [bookings] = await db.query(query, [ownerId]);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

// ==========================================
// 7.5. GET BOOKING HISTORY FOR OWNER'S VENUES
// ==========================================
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const query = `
      SELECT b.id, b.event_date, b.guest_count, b.total_amount as total_price, 
             IF(b.advance_paid >= b.total_amount, 'full_paid', IF(b.advance_paid > 0, 'advance_paid', 'pending')) as payment_status, 
             b.booking_status as status, b.created_at,
             v.title as venue_name, v.location,
             u.name as customer_name, u.phone as customer_phone
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE v.owner_id = ? AND b.booking_status != 'pending'
      ORDER BY b.event_date DESC
    `;
    const [bookings] = await db.query(query, [ownerId]);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});

// ==========================================
// 8. UPDATE BOOKING STATUS (Approve/Reject)
// ==========================================
router.put('/bookings/:id/status', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body; // 'confirmed' or 'cancelled'
    
    // Optional: verify the booking belongs to this owner
    
    await db.query('UPDATE bookings SET booking_status = ? WHERE id = ?', [status, bookingId]);
    res.status(200).json({ message: 'Booking status updated' });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: 'Server error updating booking status' });
  }
});

// ==========================================
// 9. UPDATE BOOKING PAYMENT STATUS
// ==========================================
router.put('/bookings/:id/payment', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { payment_status } = req.body; // 'advance_paid' or 'full_paid'
    
    // We update the advance_paid column based on the requested payment status
    if (payment_status === 'full_paid') {
      await db.query('UPDATE bookings SET advance_paid = total_amount WHERE id = ?', [bookingId]);
    } else if (payment_status === 'advance_paid') {
      // Dummy logic: set advance_paid to half of total_amount
      await db.query('UPDATE bookings SET advance_paid = total_amount / 2 WHERE id = ?', [bookingId]);
    }
    
    res.status(200).json({ message: 'Payment status updated' });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: 'Server error updating payment status' });
  }
});

// ==========================================
// 10. GENERATE CONFIRMATION PDF
// ==========================================
router.get('/bookings/:id/confirmation-pdf', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const ownerId = req.user.id;

    // Fetch booking details
    const query = `
      SELECT b.id, b.event_date, b.guest_count, b.total_amount as total_price, 
             IF(b.advance_paid >= b.total_amount, 'full_paid', IF(b.advance_paid > 0, 'advance_paid', 'pending')) as payment_status, 
             b.booking_status as status, b.created_at,
             v.title as venue_name, v.location as venue_location,
             u.name as customer_name, u.email as customer_email, u.phone as customer_phone
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE b.id = ? AND v.owner_id = ?
    `;
    const [bookings] = await db.query(query, [bookingId, ownerId]);
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }
    
    const booking = bookings[0];
    const eventDate = new Date(booking.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Generate PDF
    const doc = new PDFDocument({ margin: 50 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Booking_Confirmation_' + bookingId + '.pdf');
    doc.pipe(res);
    
    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('Booking Confirmation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica').text('EventHub Official Document', { align: 'center', color: 'gray' });
    doc.moveDown(2);

    // Customer & Venue Details
    doc.fontSize(14).font('Helvetica-Bold').text('Booking Details');
    doc.fontSize(12).font('Helvetica').moveDown(0.5);
    doc.text('Booking ID: #' + booking.id);
    doc.text('Status: ' + booking.status.toUpperCase());
    doc.text('Payment Status: ' + booking.payment_status.toUpperCase().replace('_', ' '));
    doc.moveDown();
    
    doc.text('Venue: ' + booking.venue_name);
    doc.text('Location: ' + booking.venue_location);
    doc.text('Event Date: ' + eventDate);
    doc.text('Guest Count: ' + booking.guest_count);
    doc.moveDown();
    
    doc.text('Customer Name: ' + booking.customer_name);
    doc.text('Customer Email: ' + booking.customer_email);
    doc.text('Customer Phone: ' + (booking.customer_phone || 'N/A'));
    doc.moveDown(2);

    // Cost Breakdown
    doc.fontSize(14).font('Helvetica-Bold').text('Financial Summary');
    doc.fontSize(12).font('Helvetica').moveDown(0.5);
    doc.text('Total Price: $' + Number(booking.total_price).toFixed(2));
    
    doc.moveDown(4);
    doc.fontSize(10).font('Helvetica-Oblique').text('Thank you for choosing EventHub venues.', { align: 'center', color: 'gray' });
    
    doc.end();
  } catch (error) {
    console.error("Error generating confirmation PDF:", error);
    res.status(500).json({ message: 'Server error generating PDF' });
  }
});

// ==========================================
// 11. CHAT: GET CONTACTS
// ==========================================
router.get('/chat-contacts', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Venue chat contacts are customers who have booked any of their venues
    const query = `
      SELECT DISTINCT u.id, u.name, u.role
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE v.owner_id = ?
    `;
    
    const [contacts] = await db.query(query, [ownerId]);
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching chat contacts:", error);
    res.status(500).json({ message: 'Server error fetching contacts' });
  }
});

// ==========================================
// 12. CHAT: GET MESSAGES
// ==========================================
router.get('/messages/:partnerId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const partnerId = req.params.partnerId;

    const query = `
      SELECT id, sender_id, receiver_id, message, sent_at
      FROM messages
      WHERE (sender_id = ? AND receiver_id = ?) 
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY sent_at ASC
    `;
    
    const [messages] = await db.query(query, [userId, partnerId, partnerId, userId]);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
});

// ==========================================
// 13. CHAT: SEND MESSAGE
// ==========================================
router.post('/messages', authenticateToken, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiver_id, message } = req.body;

    if (!receiver_id || !message) {
      return res.status(400).json({ message: 'Receiver ID and message are required.' });
    }

    const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
    await db.query(query, [senderId, receiver_id, message]);
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: 'Server error sending message' });
  }
});

// ==========================================
// 14. GET CLAIMABLE VENUES
// ==========================================
router.get('/unassigned-venues', authenticateToken, async (req, res) => {
  try {
    // ONLY return venues that have NO owner at all. If it's claimed by someone, it's gone.
    const query = 'SELECT * FROM venues WHERE owner_id IS NULL ORDER BY created_at DESC';
    const [venues] = await db.query(query);
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching unassigned venues:", error);
    res.status(500).json({ message: 'Server error fetching unassigned venues' });
  }
});

// ==========================================
// 15. CLAIM VENUE
// ==========================================
router.put('/venues/:id/claim', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const venueId = req.params.id;

    const [venues] = await db.query('SELECT owner_id FROM venues WHERE id = ?', [venueId]);
    if (venues.length === 0) return res.status(404).json({ message: 'Venue not found' });
    if (venues[0].owner_id !== null) return res.status(400).json({ message: 'Venue is already claimed by someone else' });

    await db.query('UPDATE venues SET owner_id = ? WHERE id = ?', [ownerId, venueId]);
    res.status(200).json({ message: 'Venue claimed successfully' });
  } catch (error) {
    console.error("Error claiming venue:", error);
    res.status(500).json({ message: 'Server error claiming venue' });
  }
});

// ==========================================
// 16. UNCLAIM / REMOVE VENUE
// ==========================================
router.put('/venues/:id/unclaim', authenticateToken, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const venueId = req.params.id;

    const [venues] = await db.query('SELECT owner_id FROM venues WHERE id = ?', [venueId]);
    if (venues.length === 0) return res.status(404).json({ message: 'Venue not found' });
    if (venues[0].owner_id !== ownerId) return res.status(403).json({ message: 'You do not own this venue' });

    await db.query('UPDATE venues SET owner_id = NULL WHERE id = ?', [venueId]);
    res.status(200).json({ message: 'Venue removed successfully' });
  } catch (error) {
    console.error("Error unclaiming venue:", error);
    res.status(500).json({ message: 'Server error removing venue' });
  }
});

module.exports = router;
