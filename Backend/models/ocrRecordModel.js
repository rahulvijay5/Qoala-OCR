// const mongoose = require('mongoose');

// const ocrRecordSchema = new mongoose.Schema({
//   result: { type: String, required: true, unique: true },
//   status: { type: String, required: true },
//   errorMessage: { type: String },
//   timestamp: { type: Date, default: Date.now },
// });

// const OcrRecord = mongoose.model('OcrRecord', ocrRecordSchema);

// module.exports = OcrRecord;

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

const OCRRecord = mongoose.model('OCRRecord', ocrRecordSchema);

module.exports = OCRRecord;
