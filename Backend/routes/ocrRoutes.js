const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');
const dbController = require('../controllers/dbController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Extract info from image
// router.post('/extract-info', upload.single("image"), ocrController.extractInfo, dbController.createOCRRecord);
router.post('/extract-info', upload.single("image"), ocrController.extractInfo);

module.exports = router;