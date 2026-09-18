const express = require('express');
const router = express.Router();
const db = require('../db'); // Pulls in your MySQL connection from db.js
const PDFDocument = require('pdfkit');

// ==========================================
// 1. GET ALL PENDING USERS
// ==========================================
router.get('/pending-users', async (req, res) => {
  try {
    const [pendingUsers] = await db.query(
      "SELECT id, name, email, role, status, created_at, government_id, business_license_id FROM users WHERE status = 'pending'"
    );
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// ==========================================
// 1.5 GET ALL USERS (Any status)
// ==========================================
router.get('/users', async (req, res) => {
  try {
    const [allUsers] = await db.query(
      "SELECT id, name, email, role, status, created_at, government_id, business_license_id FROM users ORDER BY created_at DESC"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: 'Server error while fetching all users' });
  }
});

// ==========================================
// 2. APPROVE A USER (PUT)
// ==========================================
router.put('/approve-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update the user's status to 'approved' in MySQL using their numeric ID
    const [result] = await db.query(
      "UPDATE users SET status = 'approved' WHERE id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User successfully approved' });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: 'Server error during approval' });
  }
});

// ==========================================
// 3. REJECT / DELETE A USER (DELETE)
// ==========================================
router.delete('/reject-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete the unapproved user completely from MySQL
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User rejected and removed' });
  } catch (error) {
    console.error("Error rejecting user:", error);
    res.status(500).json({ message: 'Server error during rejection' });
  }
});

// ==========================================
// 4. OVERVIEW & STATISTICS
// ==========================================
router.get('/stats', async (req, res) => {
  try {
    const [bookings] = await db.query("SELECT COUNT(*) as total FROM bookings");
    const [revenue] = await db.query("SELECT SUM(total_amount) as total FROM bookings WHERE booking_status != 'cancelled'");
    const [pending] = await db.query("SELECT COUNT(*) as total FROM users WHERE status = 'pending'");
    const [users] = await db.query("SELECT COUNT(*) as total FROM users WHERE role != 'admin'");
    
    res.json({
      totalBookings: bookings[0].total || 0,
      totalRevenue: revenue[0].total || 0,
      pendingApprovals: pending[0].total || 0,
      activeUsers: users[0].total || 0
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 5. SYSTEM SETTINGS (Commission & Rules)
// ==========================================
router.get('/settings', async (req, res) => {
  try {
    const [settings] = await db.query("SELECT * FROM system_settings LIMIT 1");
    res.json(settings[0] || { commission_rate: 10, cancellation_rules: '' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const { commission_rate, cancellation_rules } = req.body;
    await db.query("UPDATE system_settings SET commission_rate = ?, cancellation_rules = ?", [commission_rate, cancellation_rules]);
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 6. CATEGORIES
// ==========================================
router.get('/categories', async (req, res) => {
  try {
    const [cats] = await db.query("SELECT * FROM categories");
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
    res.json({ message: 'Category added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 6a. VENUES
// ==========================================
router.get('/venues', async (req, res) => {
  try {
    const [venues] = await db.query(`
      SELECT v.*, u.name as owner_name, u.email as owner_email 
      FROM venues v
      LEFT JOIN users u ON v.owner_id = u.id
      ORDER BY v.created_at DESC
    `);
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/venues/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM venues WHERE id = ?", [req.params.id]);
    res.json({ message: 'Venue removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 7. ANNOUNCEMENTS
// ==========================================
router.post('/announcements', async (req, res) => {
  try {
    const { title, message, target_role } = req.body;
    await db.query("INSERT INTO announcements (title, message, target_role) VALUES (?, ?, ?)", [title, message, target_role || 'all']);
    res.json({ message: 'Announcement broadcasted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/announcements', async (req, res) => {
  try {
    const [announcements] = await db.query("SELECT * FROM announcements ORDER BY created_at DESC");
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 8. PDF REPORT GENERATION
// ==========================================
router.get('/report/monthly', async (req, res) => {
  try {
    const [stats] = await db.query("SELECT COUNT(*) as count, SUM(total_amount) as revenue FROM bookings WHERE MONTH(created_at) = MONTH(CURRENT_DATE())");
    const [users] = await db.query("SELECT COUNT(*) as count FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE())");
    
    const [bookingDetails] = await db.query(`
      SELECT b.id, b.total_amount, b.booking_status, DATE_FORMAT(b.event_date, '%b %d, %Y') as event_date,
             u.name as customer_name,
             COALESCE(v.title, 'Independent Vendor Booking') as venue_name,
             (SELECT GROUP_CONCAT(ven.title SEPARATOR ', ') FROM booking_vendors bv JOIN vendors ven ON bv.vendor_id = ven.id WHERE bv.booking_id = b.id) as vendor_names
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      LEFT JOIN venues v ON b.venue_id = v.id
      WHERE MONTH(b.created_at) = MONTH(CURRENT_DATE())
      ORDER BY b.created_at DESC
    `);
    
    const doc = new PDFDocument({ margin: 50 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="monthly_report.pdf"');
    
    doc.pipe(res);
    
    doc.fontSize(25).font('Helvetica-Bold').text('EventHub Monthly Report', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).font('Helvetica').text(`Date Generated: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    
    doc.fontSize(16).font('Helvetica-Bold').text('Monthly Statistics:');
    doc.moveDown(0.5);
    
    doc.fontSize(12).font('Helvetica')
       .text(`New Bookings This Month: ${stats[0].count || 0}`)
       .text(`Total Revenue This Month: $${stats[0].revenue || '0.00'}`)
       .text(`New Users Registered This Month: ${users[0].count || 0}`);
       
    doc.moveDown(2);
    
    doc.fontSize(16).font('Helvetica-Bold').text('Booking Details:');
    doc.moveDown(0.5);
    
    if (bookingDetails.length === 0) {
      doc.fontSize(12).font('Helvetica').text('No bookings found for this month.');
    } else {
      bookingDetails.forEach(b => {
        doc.fontSize(12).font('Helvetica-Bold').text(`Booking ID: BKG-${b.id.toString().padStart(3, '0')}`);
        doc.font('Helvetica')
           .text(`Customer: ${b.customer_name}`)
           .text(`Event Date: ${b.event_date}`)
           .text(`Venue: ${b.venue_name}`);
        if (b.vendor_names) {
          doc.text(`Vendors: ${b.vendor_names}`);
        } else {
          doc.text(`Vendors: None`);
        }
        doc.text(`Total Cost: $${b.total_amount}`)
           .text(`Status: ${b.booking_status.toUpperCase()}`);
        doc.moveDown(1);
      });
    }

    doc.moveDown(2);
    doc.fontSize(10).fillColor('gray').text('This is an automatically generated system report.', { align: 'center' });
    
    doc.end();
  } catch (error) {
    console.error("PDF Error:", error);
    res.status(500).json({ message: 'Error generating report' });
  }
});

module.exports = router;