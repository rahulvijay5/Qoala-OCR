import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteForm = ({ onEntryDeleted }) => {
  const [recordId, setRecordId] = useState('');
  const [notFillDetails, setNotFillDetails] = useState(false);

  const handleDeleteData = async () => {
    try {
      // Validate inputs
      if (!recordId) {
        console.error('Please fill in the Record ID.');
        setNotFillDetails(true);
        return;
      }

      const response = await axios.delete(`http://localhost:3001/api/ocr-record/${recordId}`);

      console.log(response.data.message);

      // Trigger the parent component to update the UI
      onEntryDeleted();

      // Reset the form and state after successful deletion
      setRecordId('');
      setNotFillDetails(false);
    } catch (error) {
      console.error('Error deleting OCR data:', error.message);
    }
  };

  return (
    <div className='my-6 flex flex-col justify-center items-center rounded-md border-2  p-3'>
      <h2 className='text-xl font-bold'>Delete Some Entry:</h2>
      <form className='mt-8 mb-2 rounded-md'>
        <div className='flex justify-between items-center'>
          <label htmlFor='recordId'>Record ID:</label>
          <input
            type='text'
            id='recordId'
            className='border m-2 border-black p-1 text-black rounded-md'
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
          />
        </div>

        {notFillDetails && (
          <div className='text-center text-md my-2 p-1 rounded-md bg-red-500/50'>
            Fill the Record ID first.
          </div>
        )}

        <div className='flex justify-center'>
          <button
            type='button'
            className='outline p-1 rounded-md mt-6 w-1/2 hover:bg-red-500 font-semibold hover:text-white'
            onClick={handleDeleteData}
          >
            Delete Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteForm;
