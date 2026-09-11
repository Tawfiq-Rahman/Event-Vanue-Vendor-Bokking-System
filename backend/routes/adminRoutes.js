const express = require('express');
const router = express.Router();
const db = require('../db'); // Pulls in your MySQL connection from db.js

// ==========================================
// 1. GET ALL PENDING USERS
// ==========================================
router.get('/pending-users', async (req, res) => {
  try {
    // Select all users where the approval status is 'pending'
    const [pendingUsers] = await db.query(
      "SELECT id, name, email, role, status, created_at FROM users WHERE status = 'pending'"
    );
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ message: 'Server error while fetching users' });
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

module.exports = router;