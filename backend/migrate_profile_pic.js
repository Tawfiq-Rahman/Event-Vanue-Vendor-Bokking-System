const mysql = require('mysql2/promise');
require('dotenv').config();

async function addProfilePicture() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'event_booking_system'
  });

  try {
    // Check if column already exists
    const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'profile_picture'");
    
    if (columns.length === 0) {
      console.log("Adding profile_picture column to users table...");
      await connection.query("ALTER TABLE users ADD COLUMN profile_picture TEXT DEFAULT NULL");
      console.log("Column added successfully!");
    } else {
      console.log("Column profile_picture already exists.");
    }
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await connection.end();
  }
}

addProfilePicture();
