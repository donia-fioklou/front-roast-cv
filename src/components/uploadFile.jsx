import React, { useRef, useState } from 'react';

function FileUpload() {
  const fileInputRef = useRef(null); // Create a ref to access the hidden file input
  const [fileName, setFileName] = useState(''); // State to store the selected file name

  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Update the state with the selected file name
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6200ea',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Upload a file
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hidden file input
        onChange={handleFileChange}
      />
      {fileName && <p>Selected file: {fileName}</p>}
    </div>
  );
}

export default FileUpload;
