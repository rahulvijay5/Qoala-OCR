import React, { useState } from "react";
import axios from "axios";
import CodeViewer from "./components/CodeViewer";
import SideButtons from "./components/SideButtons";
import DisplayFilteredData from "./components/DisplayOCRData";
import DisplayAllData from "./components/DisplayAllData";
import UpdateForm from "./components/UpdateForm";
import DeleteForm from "./components/DeleteEntry";

const BACKEND_URL = "https://qoala-ocr-backend-production.up.railway.app";

console.log("BACKEND_URL: ", BACKEND_URL);

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [displayAllData, setDisplayAllData] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const handleDisplayData = () => {
    console.log("Display Filtered Data clicked");
    setDisplayData((prev) => !prev);
    setExtractedInfo(null);
    setShowDeleteForm(false);
    setDisplayAllData(false);
    setShowUpdateForm(false);
  };
  const handleDisplayAllData = () => {
    console.log("Display All Data clicked");
    setDisplayAllData((prev) => !prev);
    setExtractedInfo(null);
    setShowDeleteForm(false);
    setDisplayData(false);
    setShowUpdateForm(false);
  };
  const handleClearData = () => {
    console.log("Extraction set to hidden");
    // setSelectedFile(null);
    setExtractedInfo(null);
    setShowDeleteForm(false);
    setDisplayAllData(false);
    setShowUpdateForm(false);
    setDisplayData(false);
  };
  const handleUpdateEntry = () => {
    setShowUpdateForm(() => !showUpdateForm);
    setShowDeleteForm(false);
    setDisplayAllData(false);
    setDisplayData(false);
    setExtractedInfo(null);
  };
  const handleDeleteEntry = () => {
    setShowDeleteForm(() => !showDeleteForm);
    setShowUpdateForm(false);
    setDisplayAllData(false);
    setDisplayData(false);
    setExtractedInfo(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setExtractedInfo(null);
    setError(null);
    setShowSuccessMessage(false);
    setShowErrorModal(false);
  };

  const handleAddToDatabase = async () => {
    try {
      if (!extractedInfo) {
        throw new Error(
          "No extracted information available to add to the database."
        );
      }

      const response = await axios.post(`${BACKEND_URL}/api/add-to-database`, {
        result: extractedInfo,
        status: "success",
        errorMessage: null,
      });

      console.log(response.data.message);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.code === 11000
      ) {
        handleDuplicateKeyError();
      } else {
        showErrorToUser();
      }
    }
  };

  const handleUpload = async () => {
    setShowSuccessMessage(false);
    setShowErrorModal(false);
    setShowUpdateForm(false);
    setDisplayData(false);
    setShowDeleteForm(false);
    setExtractedInfo(null);
    try {
      if (!selectedFile) {
        throw new Error("No file selected, Please choose a file first!");
      }
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      const maxFileSizeMB = 2;
      if (fileSizeInMB > maxFileSizeMB) {
        throw new Error(
          "File size exceeds the limit (2MB). Please choose another image of smaller file size."
        );
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/extract-info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { result } = response.data;
      setExtractedInfo(result);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateKeyError = () => {
    const duplicateKeyValue = error.response.data.error.keyValue.result;

    alert(
      `Error: Duplicate key violation. The record with key ${duplicateKeyValue} already exists.`
    );
  };
  const showErrorToUser = () => {
    setShowSuccessMessage(false);
    setShowErrorModal(true);

    setTimeout(() => {
      setShowErrorModal(false);
    }, 3000);
  };

  return (
    <div className="p-8 ">
      <div>
        <SideButtons
          onDisplayAllData={handleDisplayAllData}
          onDisplayData={handleDisplayData}
          onClearData={handleClearData}
          onUpdateEntry={handleUpdateEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </div>
      <div className="py-4">
        <div className="w-full flex justify-center">
          <input
            type="file"
            className="cursor-pointer rounded-md border-dotted border-2 p-4"
            accept=".png, .jpeg, .jpg"
            onChange={handleFileChange}
          />

          <button
            className="outline bg-sky-600 text-white p-4 rounded-md ml-2 w-fit hover:bg-black max-w-fit font-semibold"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {error && (
          <div>
            <p className="text-red-500 text-center font-bold">{error}</p>
          </div>
        )}
        {loading && (
          <p className="w-full mt-2 text-center">Getting results...</p>
        )}

        {extractedInfo && !loading && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-4/6">
              <h2 className="font-bold w-full text-xl my-2">
                Extracted Information:
              </h2>
              <div className="">
                <CodeViewer code={extractedInfo} />
              </div>
              <button
                className="outline p-2 rounded-md mt-2 w-full hover:bg-black font-semibold hover:text-white"
                onClick={handleAddToDatabase}
              >
                Add to Database
              </button>
              {showSuccessMessage && (
                <div className="text-center text-md my-2 p-1 rounded-md bg-green-500/50">
                  Success! Data added to the database.
                </div>
              )}
              {showErrorModal && (
                <div className="text-center text-md my-2 p-1 rounded-md bg-red-500/50">
                  Error! Failed to add data to the database.
                </div>
              )}
            </div>
          </div>
        )}
        {showDeleteForm && <DeleteForm />}
        {showUpdateForm && <UpdateForm />}
        <div className="mt-4">
          {displayData && <DisplayFilteredData key={Date.now()} />}
          {displayAllData && <DisplayAllData key={Date.now()} />}
        </div>
      </div>
      <div className="italic bottom-0 flex justify-center">
        <p>Find Github repository of this whole project</p>
        <a
          className="text-sky-600"
          target="_blank"
          href="https://github.com/rahulvijay5/Qoala-OCR"
        >
          @rahulvijay5🚀
        </a>
      </div>
    </div>
  );
}

export default App;
