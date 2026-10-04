const db = require('./db');

async function migrate() {
  try {
    console.log("Adding is_read column to messages table...");
    await db.query("ALTER TABLE messages ADD COLUMN is_read tinyint(1) DEFAULT 0");
    console.log("Successfully added is_read column.");
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("is_read column already exists.");
    } else {
      console.error("Migration failed:", error);
    }
  } finally {
    process.exit();
  }
}

migrate();
