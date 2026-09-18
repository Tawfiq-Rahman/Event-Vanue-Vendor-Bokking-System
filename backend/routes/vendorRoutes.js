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

const vendorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'vendor-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const uploadVendorImage = multer({ storage: vendorStorage });

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    if (user.role !== 'vendor') return res.status(403).json({ message: 'Access denied. Vendors only.' });
    req.user = user;
    next();
  });
};

// ==========================================
// 1. GET ALL SERVICE REQUESTS FOR VENDOR
// ==========================================
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // First, find the vendor's actual vendor_id
    const [vendors] = await db.query('SELECT id FROM vendors WHERE user_id = ?', [userId]);
    
    // If they aren't fully registered in vendors table yet, return empty
    if (vendors.length === 0) {
       return res.status(200).json([]);
    }
    
    const vendorIds = vendors.map(v => v.id);

    const query = `
      SELECT bv.id, bv.service_status as status, bv.cost, 
             b.event_date, b.guest_count,
             v.title as venueName, v.location,
             u.name as customerName, u.phone as customerPhone
      FROM booking_vendors bv
      JOIN bookings b ON bv.booking_id = b.id
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE bv.vendor_id IN (?)
      ORDER BY b.event_date ASC
    `;
    
    const [requests] = await db.query(query, [vendorIds]);
    
    // Map data for frontend
    const formattedRequests = requests.map(r => ({
      id: r.id,
      customerName: r.customerName,
      customerPhone: r.customerPhone || 'N/A',
      venueName: r.venueName,
      location: r.location,
      date: new Date(r.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
      guests: r.guest_count,
      status: r.status, // 'pending', 'accepted', 'declined', 'preparing', 'ready'
      cost: `$${Number(r.cost).toLocaleString()}`
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching vendor requests:", error);
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
});

// ==========================================
// 2. UPDATE REQUEST STATUS
// ==========================================
router.put('/requests/:id/status', authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'accepted', 'declined', 'preparing', 'ready'];
    if (!validStatuses.includes(status)) {
       return res.status(400).json({ message: 'Invalid status' });
    }

    await db.query('UPDATE booking_vendors SET service_status = ? WHERE id = ?', [status, requestId]);
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: 'Server error updating status' });
  }
});

// ==========================================
// 3. GET VENDOR PORTFOLIOS (ALL OWNED VENDORS)
// ==========================================
router.get('/vendors', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const [vendors] = await db.query('SELECT * FROM vendors WHERE user_id = ? ORDER BY id DESC', [userId]);
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: 'Server error fetching vendors' });
  }
});

// ==========================================
// 4. CREATE A NEW VENDOR PORTFOLIO
// ==========================================
router.post('/vendors', authenticateToken, uploadVendorImage.single('image_file'), async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, service_type, portfolio_description, starting_rate, location } = req.body;
    let image_url = req.body.image_url;
    
    // If a file was uploaded, use the server URL for the image
    if (req.file) {
      image_url = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    
    // Fallback to a default image
    const img = image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600';

    await db.query(
      'INSERT INTO vendors (user_id, title, service_type, portfolio_description, starting_rate, location, image_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, title || 'Custom Vendor', service_type, portfolio_description, starting_rate, location || 'Available Nationwide', img, 0.0]
    );

    res.status(201).json({ message: 'Vendor profile created successfully' });
  } catch (error) {
    console.error("Error creating vendor profile:", error);
    res.status(500).json({ message: 'Server error creating vendor profile' });
  }
});

// ==========================================
// 5. GET VENDOR BASIC USER PROFILE
// ==========================================
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const vendorId = req.user.id;
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [vendorId]
    );
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// ==========================================
// 6. UPDATE VENDOR BASIC USER PROFILE
// ==========================================
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { name, email, phone, dob, address, profile_picture } = req.body;

    await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, address = ?, profile_picture = ? WHERE id = ?',
      [name, email, phone || '', dob || null, address || '', profile_picture || null, vendorId]
    );

    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [vendorId]
    );

    res.status(200).json({ message: 'Profile updated successfully!', user: users[0] });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// ==========================================
// 6.5. UPLOAD VENDOR PROFILE PICTURE
// ==========================================
router.post('/profile/upload', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const vendorUserId = req.user.id;
    // Generate the URL to access the uploaded file
    const profilePictureUrl = `http://localhost:5000/uploads/profiles/${req.file.filename}`;

    // Update the database with the new URL
    await db.query(
      'UPDATE users SET profile_picture = ? WHERE id = ?',
      [profilePictureUrl, vendorUserId]
    );

    // Fetch updated user to return to frontend
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, dob, address, profile_picture FROM users WHERE id = ?',
      [vendorUserId]
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
// 7. CHANGE VENDOR PASSWORD
// ==========================================

router.put('/password', authenticateToken, async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required.' });
    }

    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [vendorId]);
    if (users.length === 0) return res.status(404).json({ message: 'User not found.' });

    const user = users[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, vendorId]);

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: 'Server error during password update' });
  }
});

// ==========================================
// 8. CHAT: GET CONTACTS
// ==========================================
router.get('/chat-contacts', authenticateToken, async (req, res) => {
  try {
    const vendorUserId = req.user.id;
    
    // Vendor chat contacts are customers who have booked them
    const [vendors] = await db.query('SELECT id FROM vendors WHERE user_id = ?', [vendorUserId]);
    if (vendors.length === 0) return res.status(200).json([]);
    
    const vendorId = vendors[0].id;

    // Get unique customers from bookings
    const query = `
      SELECT DISTINCT u.id, u.name, u.role
      FROM booking_vendors bv
      JOIN bookings b ON bv.booking_id = b.id
      JOIN users u ON b.customer_id = u.id
      WHERE bv.vendor_id = ?
    `;
    
    const [contacts] = await db.query(query, [vendorId]);
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching chat contacts:", error);
    res.status(500).json({ message: 'Server error fetching contacts' });
  }
});

// ==========================================
// 9. CHAT: GET MESSAGES
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
// 10. CHAT: SEND MESSAGE
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
// 11. GET VENDOR HISTORY
// ==========================================
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const [vendors] = await db.query('SELECT id FROM vendors WHERE user_id = ?', [userId]);
    
    if (vendors.length === 0) {
      return res.status(200).json([]);
    }

    const vendorIds = vendors.map(v => v.id);

    const query = `
      SELECT bv.*, 
             v.title as venue_name, v.location,
             u.name as customer_name, u.phone as customer_phone,
             b.event_date, bv.service_status as status
      FROM booking_vendors bv
      JOIN bookings b ON bv.booking_id = b.id
      JOIN venues v ON b.venue_id = v.id
      JOIN users u ON b.customer_id = u.id
      WHERE bv.vendor_id IN (?) AND bv.service_status != 'pending'
      ORDER BY b.event_date DESC
    `;
    const [requests] = await db.query(query, [vendorIds]);
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching vendor history:", error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});

// ==========================================
// 12. GET CLAIMABLE VENDORS
// ==========================================
router.get('/unassigned-vendors', authenticateToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM vendors WHERE user_id IS NULL';
    const [vendors] = await db.query(query);
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching unassigned vendors:", error);
    res.status(500).json({ message: 'Server error fetching unassigned vendors' });
  }
});

// ==========================================
// 13. CLAIM VENDOR
// ==========================================
router.put('/vendors/:id/claim', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vendorId = req.params.id;

    // Ensure user doesn't already have a vendor
    const [existing] = await db.query('SELECT id FROM vendors WHERE user_id = ?', [userId]);
    if (existing.length > 0) return res.status(400).json({ message: 'You already have a vendor profile' });

    const [vendors] = await db.query('SELECT user_id FROM vendors WHERE id = ?', [vendorId]);
    if (vendors.length === 0) return res.status(404).json({ message: 'Vendor not found' });
    if (vendors[0].user_id !== null) return res.status(400).json({ message: 'Vendor is already claimed by someone else' });

    await db.query('UPDATE vendors SET user_id = ? WHERE id = ?', [userId, vendorId]);
    res.status(200).json({ message: 'Vendor claimed successfully' });
  } catch (error) {
    console.error("Error claiming vendor:", error);
    res.status(500).json({ message: 'Server error claiming vendor' });
  }
});

// ==========================================
// 14. UNCLAIM / REMOVE VENDOR
// ==========================================
router.put('/vendors/:id/unclaim', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const vendorId = req.params.id;

    const [vendors] = await db.query('SELECT user_id FROM vendors WHERE id = ?', [vendorId]);
    if (vendors.length === 0) return res.status(404).json({ message: 'Vendor not found' });
    if (vendors[0].user_id !== userId) return res.status(403).json({ message: 'You do not own this vendor' });

    await db.query('UPDATE vendors SET user_id = NULL WHERE id = ?', [vendorId]);
    res.status(200).json({ message: 'Vendor removed successfully' });
  } catch (error) {
    console.error("Error unclaiming vendor:", error);
    res.status(500).json({ message: 'Server error removing vendor' });
  }
});

module.exports = router;
