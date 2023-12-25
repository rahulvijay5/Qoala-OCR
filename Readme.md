QOALA Assignment - Thai ID
---
## Overview

This document summarizes the steps and development process of implementing Thai OCR extraction and management using Tesseract.js, Google Vision, MongoDB, and React.

## 1. Initial Setup

- Started with Tesseract.js for OCR extraction.
- Explored Google Vision for improved performance.
- Tested the speed of Google Vision on the local computer.

## 2. Data Parsing

- Parsed extracted data using the parse function.
- Faced challenges due to high variations in data.

## 3. Gemini-Pro Integration

- Adopted Google's newly launched Gemini-Pro for improved data extraction in JSON format.

## 4. Database Management

- Utilized MongoDB Compass for initial database management.
- Migrated to MongoDB Atlas for better scalability and management.

## 5. CRUD Operations

- Implemented CRUD operations for OCR records in the MongoDB database.

### API Endpoints

- **Add OCR Record:** 
        
    *POST* - [https://qoala-ocr-backend-production.up.railway.app/api/add-to-database](https://qoala-ocr-backend-production.up.railway.app/api/add-to-database)
- **Retrieve OCR Data:** 

    *GET* - [https://qoala-ocr-backend-production.up.railway.app/api/ocr-records](https://qoala-ocr-backend-production.up.railway.app/api/ocr-records)
- **Update OCR Record:** 

    *PUT* - [https://qoala-ocr-backend-production.up.railway.app/api/ocr-record/:id](https://qoala-ocr-backend-production.up.railway.app/api/ocr-record/:id)
- **Delete OCR Record:** 

    *DELETE* - [https://qoala-ocr-backend-production.up.railway.app/api/ocr-record/:id](https://qoala-ocr-backend-production.up.railway.app/api/ocr-record/:id)

## 6. Frontend Integration

- Created a React component for displaying OCR data.
- Implemented a UI form for updating and deleting OCR records.
- Added functionality to filter and sort displayed data.

### Frontend App URL

- [https://qoala-ocr-frontend.vercel.app/](https://qoala-ocr-frontend.vercel.app/)

## User Interface Overview
1.  **Upload Thai ID:** 
Upon uploading a Thai ID image, receive a neatly formatted JSON code, allowing users to copy and use the data effortlessly.


2. **View All Data:**
Explore a comprehensive display of Thai OCR data in a clean and organized tabular format.

3. **Filter Data:**
Easily refine data by Date of Birth (DOB) or other criteria, providing quick access to specific records.

4. **Update User Data:**
Effortlessly modify OCR records by entering the Record ID and selecting the desired field for an update.

5. **Delete User Entry:**
Delete entries seamlessly using the Record ID, streamlining the removal process.

## 7. Conclusion

- Successfully integrated OCR extraction, database management, and frontend UI.
- Achieved robust CRUD operations on the MongoDB Atlas database.

---
