import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please select a file to upload');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(
          'https://example.com/api/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log(response.data);
        // do something with the response
      } catch (error) {
        console.log(error);
        // handle the error
      }
    } else {
      setError('Please select a file to upload');
    }
  };

  return (
    <div className="file-upload-background">
      <div className="file-upload-container">
        <h1 className="file-upload-title">File Upload</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file" className="file-upload-label">Select a file</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && <p className="file-upload-error">{error}</p>}
          <button type="submit" className="btn file-upload-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
