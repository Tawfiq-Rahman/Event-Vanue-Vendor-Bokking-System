const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db');

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
    const [venues] = await db.query(`
      SELECT v.*, u.name as owner_name, u.id as owner_user_id 
      FROM venues v 
      LEFT JOIN users u ON v.owner_id = u.id 
      ORDER BY v.created_at DESC
    `);
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));