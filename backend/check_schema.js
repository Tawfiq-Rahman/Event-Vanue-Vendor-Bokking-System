const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkSchema() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'event_booking_system'
  });

  try {
    console.log("--- VENDORS TABLE SCHEMA ---");
    const [vendorDesc] = await connection.query('DESCRIBE vendors');
    console.log(vendorDesc);

    console.log("--- BOOKING VENDORS TABLE SCHEMA ---");
    const [bookingVendorDesc] = await connection.query('DESCRIBE booking_vendors');
    console.log(bookingVendorDesc);
    
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await connection.end();
  }
}

checkSchema();
