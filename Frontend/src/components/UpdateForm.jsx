import React, { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = "https://qoala-ocr-backend-production.up.railway.app";

// import dotenv from "dotenv";
// dotenv.config();

const UpdateForm = () => {
  const [recordId, setRecordId] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [notFillDetails, setnotFillDetails] = useState(false);

  const handleUpdateData = async () => {
    try {
      // Validate inputs
      if (!recordId || !selectedField || !updatedValue) {
        console.error("Please fill in all fields.");
        setnotFillDetails(true);
        return;
      }

      // Make a PUT request to update the OCR record
      const response = await axios.put(
        `${BACKEND_URL}/api/ocr-record/${recordId}`,
        {
          [selectedField]: updatedValue,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating OCR data:", error.message);
    }
  };

  return (
    <div className="my-6 flex flex-col justify-center items-center rounded-md border-2  p-3">
      <h2 className="text-xl font-bold">Update OCR Data:</h2>
      <form className="mt-8 mb-2 rounded-md">
        <div className="flex justify-between items-center">
          <label htmlFor="recordId">Record ID:</label>
          <input
            type="text"
            id="recordId"
            className="border m-2 border-black p-1 text-black rounded-md"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="selectedField">Field to Update:</label>
          <select
            id="selectedField"
            value={selectedField}
            className="border m-2 border-black p-1 text-black rounded-md"
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">Select Field</option>
            <option value="result.identification_number">
              Identification Number
            </option>
            <option value="result.name">Name</option>
            <option value="result.last_name">Last Name</option>
            <option value="result.date_of_birth">Date of Birth</option>
            <option value="result.date_of_issue">Date of Issue</option>
            <option value="result.date_of_expiry">Date of Expiry</option>
            <option value="result.status">Status</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="updatedValue">Updated Value:</label>
          <input
            type="text"
            id="updatedValue"
            className="border m-2 border-black p-1 text-black rounded-md"
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
          />
        </div>

        {notFillDetails && (
          <div className="text-center text-md my-2 p-1 rounded-md bg-red-500/50">
            Fill all the details first.
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            className="outline p-1 rounded-md mt-6 w-1/2 hover:bg-black font-semibold hover:text-white"
            onClick={handleUpdateData}
          >
            Update Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
