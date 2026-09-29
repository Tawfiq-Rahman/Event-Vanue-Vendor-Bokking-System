const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Pulls in your MySQL connection
const { registrationUploads, removeUploadedFiles } = require('../userUploads');

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// ==========================================
// 1. REGISTER ROUTE
// ==========================================
router.post('/register', registrationUploads, async (req, res) => {
  const { name, email, password, role, phone, government_id, business_license_id } = req.body;
  const isBusinessRole = role === 'vendor' || role === 'venue_owner';

  // Uploaded files (profile picture, government ID card, business license)
  const uploads = req.files || {};
  const profilePicture = uploads.profile_picture?.[0];
  const governmentIdDocument = uploads.government_id_document?.[0];
  let businessLicenseDocument = uploads.business_license_document?.[0];

  // Removes any saved uploads before sending an error back
  const rejectRegistration = (status, message) => {
    removeUploadedFiles(req.files);
    return res.status(status).json({ message });
  };

  if (!name || !email || !password || !role) {
    return rejectRegistration(400, 'Please provide all required fields.');
  }

  if (isBusinessRole && (!government_id || !business_license_id)) {
    return rejectRegistration(400, 'Government ID and Business License ID are required for vendors and venue owners.');
  }

  // Every account needs a profile picture and a government ID card for admin verification
  if (!profilePicture) {
    return rejectRegistration(400, 'Please upload a profile picture.');
  }

  if (!governmentIdDocument) {
    return rejectRegistration(400, 'Please upload your Government ID card for verification.');
  }

  if (isBusinessRole && !businessLicenseDocument) {
    return rejectRegistration(400, 'Please upload your Business License for verification.');
  }

  // Customers don't have a business license, so ignore one if it was sent
  if (!isBusinessRole && businessLicenseDocument) {
    removeUploadedFiles({ business_license_document: [businessLicenseDocument] });
    businessLicenseDocument = null;
  }

  let userCreated = false;
  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return rejectRegistration(400, 'Email already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ALL roles must wait for Admin approval
    const initialStatus = 'pending';

    // Insert new user into MySQL
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, status, phone, government_id, business_license_id, profile_picture, government_id_document, business_license_document) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name, email, hashedPassword, role, initialStatus, phone || '', government_id || null, business_license_id || null,
        profilePicture ? `http://localhost:5000/uploads/profiles/${profilePicture.filename}` : null,
        governmentIdDocument ? governmentIdDocument.filename : null,
        businessLicenseDocument ? businessLicenseDocument.filename : null
      ]
    );
    userCreated = true;

    // If registered as a vendor, randomly assign one unique available vendor
    if (role === 'vendor') {
      const [availableVendors] = await db.query('SELECT id FROM vendors WHERE user_id IS NULL ORDER BY RAND() LIMIT 1');
      if (availableVendors.length > 0) {
        await db.query('UPDATE vendors SET user_id = ? WHERE id = ?', [result.insertId, availableVendors[0].id]);
      }
    }

    // If registered as a venue_owner, randomly assign one unique available venue
    if (role === 'venue_owner') {
      const [availableVenues] = await db.query('SELECT id FROM venues WHERE owner_id IS NULL ORDER BY RAND() LIMIT 1');
      if (availableVenues.length > 0) {
        await db.query('UPDATE venues SET owner_id = ? WHERE id = ?', [result.insertId, availableVenues[0].id]);
      }
    }

    res.status(201).json({
      message: 'Registration successful!',
      userId: result.insertId,
      status: initialStatus
    });
  } catch (error) {
    console.error("Registration Error:", error);
    // Only clean up files if the user row was never saved (otherwise it points at them)
    if (!userCreated) removeUploadedFiles(req.files);
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
        role: user.role,
        profile_picture: user.profile_picture,
        phone: user.phone,
        dob: user.dob,
        address: user.address
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;