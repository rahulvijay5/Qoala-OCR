const mongoose = require('mongoose');

const ocrRecordSchema = new mongoose.Schema({
    result: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    errorMessage: {
        type: String,
    },
}, { timestamps: true });

const OCRRecord = mongoose.model('OCRRecord', ocrRecordSchema, 'ocrCollection');

module.exports = OCRRecord;
