import React, { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = "https://qoala-ocr-backend-production.up.railway.app";

// import dotenv from "dotenv";
// dotenv.config();
// Display Filtered Data

const DisplayFilteredData = () => {
  const [ocrData, setOCRData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    date_of_birth: "",
  });

  const handleRetrieveData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/ocr-records`, {
        params: filterOptions,
      });
      setOCRData(response.data.ocrRecords);
    } catch (error) {
      console.error("Error fetching OCR data:", error.message);
    }
  };

  const handleFilterByDateOfBirth = (event) => {
    event.preventDefault();
    // console.log("event.target:", event.target);
    const value = event.target.value;
    setFilterOptions({
      ...filterOptions,
      date_of_birth: value,
    });
    // console.log(value)
  };

  useEffect(() => {
    handleRetrieveData();
  }, [filterOptions]);

  return (
    <div className="border p-2 rounded-md">
      <div className="flex mb-2 justify-between">
        <div>
          <h2 className="text-2xl font-bold">OCR Data:</h2>
          <p className="text-xs opacity-60">(ⓘ Try to filter entries by DOB)</p>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div>
            <label className="" htmlFor="dateOfBirthFilter">
              Filter by Date of Birth:
            </label>
            <p className="text-xs opacity-60">(ⓘ format: 03/02/2003)</p>
          </div>
          <input
            className="border m-2 border-black p-1 text-black rounded-md"
            type="text"
            id="dateOfBirthFilter"
            value={filterOptions.date_of_birth}
            onChange={handleFilterByDateOfBirth}
          />
        </div>
      </div>
      {console.log(ocrData)}
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                DB ID
              </th>
              <th scope="col" className="px-6 py-3">
                Identification Number
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Issue
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Expiry
              </th>
              {/* <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created At
                    </th> */}
            </tr>
          </thead>
          <tbody>
            {ocrData.map((record) => (
              <tr
                key={record._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record._id}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.result.identification_number}
                </td>
                <td class="px-6 py-4">{record.result.name}</td>
                <td class="px-6 py-4">{record.result.last_name}</td>
                <td class="px-6 py-4">{record.result.date_of_birth}</td>
                <td class="px-6 py-4">{record.result.date_of_issue}</td>
                <td class="px-6 py-4">{record.result.date_of_expiry}</td>
                {/* <td class="px-6 py-4">
                    {record.result.status}
                    </td>
                    <td class="px-6 py-4">
                    {record.result.$date}
                    </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayFilteredData;
