const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');


router.post('/add-to-database', dbController.createOCRRecord);

router.delete('/ocr-record/:id', dbController.deleteOCRRecord);

router.put('/ocr-record/:id', dbController.updateOCRRecord);

router.get('/ocr-records', dbController.getOCRRecords);

router.get('/all-ocr-records', dbController.getAllOCRRecords);


module.exports = router;
