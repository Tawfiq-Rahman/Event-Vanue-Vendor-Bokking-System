const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Profile pictures are public (served from /uploads like the existing ones).
// ID cards and business licenses are private and only served through the admin API.
const PROFILES_DIR = path.join(__dirname, 'uploads/profiles');
const DOCUMENTS_DIR = path.join(__dirname, 'private_uploads/documents');

fs.mkdirSync(PROFILES_DIR, { recursive: true });
fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const IMAGE_EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};
const DOCUMENT_EXTENSIONS = { ...IMAGE_EXTENSIONS, 'application/pdf': '.pdf' };

const REGISTRATION_FIELDS = {
  profile_picture: { dir: PROFILES_DIR, prefix: 'profile', types: IMAGE_EXTENSIONS, label: 'Profile picture must be an image (JPG, PNG, WEBP or GIF).' },
  government_id_document: { dir: DOCUMENTS_DIR, prefix: 'govid', types: DOCUMENT_EXTENSIONS, label: 'Government ID card must be an image or a PDF.' },
  business_license_document: { dir: DOCUMENTS_DIR, prefix: 'license', types: DOCUMENT_EXTENSIONS, label: 'Business license must be an image or a PDF.' }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, REGISTRATION_FIELDS[file.fieldname].dir);
  },
  filename: function (req, file, cb) {
    const field = REGISTRATION_FIELDS[file.fieldname];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${field.prefix}-${uniqueSuffix}${field.types[file.mimetype]}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: function (req, file, cb) {
    const field = REGISTRATION_FIELDS[file.fieldname];
    if (!field.types[file.mimetype]) return cb(new Error(field.label));
    cb(null, true);
  }
}).fields(Object.keys(REGISTRATION_FIELDS).map((name) => ({ name, maxCount: 1 })));

const removeFile = (filePath) => {
  fs.unlink(filePath, () => {});
};

// Deletes everything multer saved for this request (used when registration fails)
const removeUploadedFiles = (files) => {
  Object.values(files || {}).flat().forEach((file) => removeFile(file.path));
};

// Deletes a user's private documents by their stored file names
const removeUserDocuments = (...fileNames) => {
  fileNames.filter(Boolean).forEach((fileName) => removeFile(path.join(DOCUMENTS_DIR, path.basename(fileName))));
};

// Wraps multer so upload problems come back as a normal 400 JSON message
const registrationUploads = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) return next();
    removeUploadedFiles(req.files);
    let message = err.message;
    if (err.code === 'LIMIT_FILE_SIZE') message = 'Each uploaded file must be 5 MB or smaller.';
    else if (err.code === 'LIMIT_UNEXPECTED_FILE') message = 'Unexpected file upload.';
    res.status(400).json({ message });
  });
};

module.exports = { DOCUMENTS_DIR, registrationUploads, removeUploadedFiles, removeUserDocuments };
