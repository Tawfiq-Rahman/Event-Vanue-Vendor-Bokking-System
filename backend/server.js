const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db');
const ensureUserDocumentColumns = require('./migrate_user_documents');

// 1. Import your dedicated route files
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoute');
const customerRoutes = require('./routes/customerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const venueOwnerRoutes = require('./routes/venueOwnerRoutes');

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Connect the routes to the Express app
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/venue-owner', venueOwnerRoutes);

// Public API for Venues
app.get('/api/venues/public', async (req, res) => {
  try {
    const { date, capacity, budget } = req.query;
    
    let query = `
      SELECT v.*, u.name as owner_name, u.id as owner_user_id 
      FROM venues v 
      LEFT JOIN users u ON v.owner_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (capacity && !isNaN(capacity)) {
      query += ` AND v.capacity >= ?`;
      params.push(Number(capacity));
    }

    if (budget) {
      if (budget === 'low') {
        query += ` AND v.price_per_day <= 1000`;
      } else if (budget === 'med') {
        query += ` AND v.price_per_day BETWEEN 1000 AND 5000`;
      } else if (budget === 'high') {
        query += ` AND v.price_per_day > 5000`;
      }
    }

    if (date) {
      query += ` AND v.id NOT IN (
        SELECT venue_id FROM bookings 
        WHERE event_date = ? AND booking_status IN ('pending', 'confirmed', 'completed')
      )`;
      params.push(date);
    }

    query += ` ORDER BY v.created_at DESC`;

    const [venues] = await db.query(query, params);
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching public venues:", error);
    res.status(500).json({ message: 'Server error fetching venues' });
  }
});

// Public API for Vendors
app.get('/api/vendors/public', async (req, res) => {
  try {
    const [vendors] = await db.query(`
      SELECT v.* 
      FROM vendors v 
      ORDER BY v.id ASC
    `);
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching public vendors:", error);
    res.status(500).json({ message: 'Server error fetching vendors' });
  }
});

app.get('/api/public/check-availability', async (req, res) => {
  try {
    const { type, slug, date } = req.query;
    
    if (type === 'venue') {
      const [venues] = await db.query("SELECT id FROM venues WHERE LOWER(REPLACE(title, ' ', '-')) = ?", [slug]);
      if (venues.length === 0) return res.json({ available: true, message: 'The venue is available' });
      
      const venueId = venues[0].id;
      const [bookings] = await db.query(
        "SELECT id FROM bookings WHERE venue_id = ? AND event_date = ? AND booking_status IN ('pending', 'confirmed', 'completed')",
        [venueId, date]
      );
      
      if (bookings.length > 0) {
        res.json({ available: false, message: 'The venue is booked at that time slot' });
      } else {
        res.json({ available: true, message: 'The venue is available' });
      }
    } else if (type === 'vendor' || type === 'package') {
      // For vendors, match on business_name
      let matchName = slug;
      if (type === 'package') {
        // Just mock available for packages if no vendor matches directly, as packages in this app are static
        return res.json({ available: true, message: 'The package is available' });
      }
      
      const [vendors] = await db.query("SELECT id FROM vendors WHERE LOWER(REPLACE(REPLACE(title, '&', 'and'), ' ', '-')) = ?", [matchName]);
      if (vendors.length === 0) return res.json({ available: true, message: 'The vendor is available' });
      
      const vendorId = vendors[0].id;
      const [bookings] = await db.query(
        "SELECT bv.id FROM booking_vendors bv JOIN bookings b ON bv.booking_id = b.id WHERE bv.vendor_id = ? AND b.event_date = ? AND bv.service_status IN ('pending', 'accepted', 'preparing', 'ready') AND b.booking_status IN ('pending', 'confirmed', 'completed')",
        [vendorId, date]
      );
      
      if (bookings.length > 0) {
        res.json({ available: false, message: 'The vendor is booked at that time slot' });
      } else {
        res.json({ available: true, message: 'The vendor is available' });
      }
    } else {
      res.json({ available: true, message: 'Available' });
    }
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 4. Health check endpoint (Great for testing if the DB is connected!)
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'success', message: 'Backend connected to MySQL successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 5. Start the server
// Make sure the users table has the registration document columns
ensureUserDocumentColumns().catch((error) => console.error('Could not update users table:', error.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));