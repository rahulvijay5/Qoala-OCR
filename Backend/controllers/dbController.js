const OCRRecord = require('../models/ocrRecordModel');

const getAllOCRRecords = async (req, res) => {
    try {
      const ocrRecords = await OCRRecord.find();
      res.json({ ocrRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

const getOCRRecords = async (req, res) => {
    try {
      const filterOptions = req.query; // Get filter options from query parameters
  
      // Transform filter options to handle nested fields
      const transformedFilter = {};
      for (const key in filterOptions) {
        transformedFilter[`result.${key}`] = filterOptions[key];
      }
  
      // Implement logic to retrieve OCR records based on filter options
      const ocrRecords = await OCRRecord.find(transformedFilter);
  
      res.json({ ocrRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

const updateOCRRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Implement logic to update the OCR record in the database
      const updatedRecord = await OCRRecord.findByIdAndUpdate(id, updatedData, { new: true });
  
      res.json({ updatedRecord, message: 'OCR record updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

const createOCRRecord = async (req, res) => {
    try {
        console.log("Once I got here")
        console.log(req.body)
        const { result, status, errorMessage } = req.body;
        // Parse the JSON string to a JavaScript object
        const resultObject = JSON.parse(result);
        const newOCRRecord = new OCRRecord({
            result: resultObject,
            status,
            errorMessage,
        });
        await newOCRRecord.save();
        res.status(201).json({ message: 'OCR record created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteOCRRecord = async (req, res) => {
    try {
        console.log(req.body)
        const recordId = req.params.id;

        // Use Mongoose to find and delete the OCR record by ID
        const deletedRecord = await OCRRecord.findByIdAndDelete(recordId);

        if (!deletedRecord) {
            return res.status(404).json({ error: 'OCR record not found.' });
        }

        res.json({ message: 'OCR record deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Add other controller functions for updating, retrieving, and other CRUD operations

module.exports = {
    createOCRRecord,
    deleteOCRRecord,
    getOCRRecords,
    getAllOCRRecords,
    updateOCRRecord,
    // Add other controller functions for updating, retrieving, and other CRUD operations
};
