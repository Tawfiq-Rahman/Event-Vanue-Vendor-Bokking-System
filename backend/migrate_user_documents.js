const db = require('./db');

// Adds the columns that store uploaded ID card / business license file names.
// Safe to run many times: existing columns are left untouched.
const DOCUMENT_COLUMNS = ['government_id_document', 'business_license_document'];

async function ensureUserDocumentColumns() {
  for (const column of DOCUMENT_COLUMNS) {
    const [columns] = await db.query('SHOW COLUMNS FROM users LIKE ?', [column]);
    if (columns.length === 0) {
      await db.query(`ALTER TABLE users ADD COLUMN ${column} TEXT DEFAULT NULL`);
      console.log(`Added ${column} column to users table.`);
    }
  }
}

module.exports = ensureUserDocumentColumns;

// Allow running directly: node migrate_user_documents.js
if (require.main === module) {
  ensureUserDocumentColumns()
    .then(() => console.log('User document columns are ready.'))
    .catch((error) => console.error('Migration failed:', error))
    .finally(() => db.end());
}
