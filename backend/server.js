const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

// 1. Import your dedicated route files
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoute');

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Connect the routes to the Express app
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

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