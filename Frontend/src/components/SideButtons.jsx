import React from 'react';

function SideButtons({ onDisplayAllData, onDisplayData, onClearData, onUpdateEntry, onDeleteEntry }) {
  return (
    <div className=''>
    <div className='border h-full p-5 flex justify-between w-full bg-slate-200 rounded-lg items-center'>
        <p className='font-bold text-lg text-center'>Thai ID Verification App</p>
        <div className='flex gap-3'>
        <button className='outline font-medium rounded-md drop-shadow shadow-black shadow-md p-2 hover:bg-black hover:text-white' onClick={onDisplayAllData}>Display All Data</button>
      <button className='outline font-medium rounded-md drop-shadow shadow-black shadow-md p-2 hover:bg-black hover:text-white' onClick={onDisplayData}>Display Filtered Data</button>
      <button className='outline font-medium rounded-md drop-shadow shadow-black shadow-md p-2 hover:bg-black disabled:drop-shadow-none disabled:text-black/50 disabled:bg-current  hover:text-white' onClick={onUpdateEntry}>Update Entry</button>
      <button className='outline font-medium rounded-md drop-shadow shadow-black shadow-md p-2 hover:bg-black disabled:drop-shadow-none disabled:text-black/50 disabled:bg-current hover:text-white'  onClick={onDeleteEntry}>Delete Entry</button>
      <button className='outline font-medium rounded-md drop-shadow shadow-black shadow-md p-2 hover:bg-black disabled:drop-shadow-none disabled:text-black/50 disabled:bg-current hover:text-white' onClick={onClearData}>Clear All</button>
        </div>
    </div>
    </div>
  );
}

export default SideButtons;
