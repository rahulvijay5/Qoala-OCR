import React, { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = "https://qoala-ocr-backend-production.up.railway.app";

// import dotenv from "dotenv";
// dotenv.config();

const DisplayAllData = () => {
  const [ocrData, setOCRData] = useState([]);
  const handleRetrieveData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/all-ocr-records`
      );
      setOCRData(response.data.ocrRecords);
    } catch (error) {
      console.error("Error fetching OCR data:", error.message);
    }
  };

  useEffect(() => {
    handleRetrieveData();
  }, []);

  return (
    <div className="border p-2 rounded-md">
      <h2 className="text-2xl font-bold">OCR Data:</h2>
      {console.log(ocrData)}
      <div class="relative mt-4 overflow-x-auto rounded-lg">
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

export default DisplayAllData;
