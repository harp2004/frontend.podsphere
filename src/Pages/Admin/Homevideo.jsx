import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homevideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedByEmail, setUploadedByEmail] = useState('');

  useEffect(() => {
    const fetchUploaderEmail = async () => {
      try {
        const emailRes = await axios.get('http://localhost:5000/api/videos/get-last-uploadedby');
        if (emailRes.data.email) {
          setUploadedByEmail(emailRes.data.email);
        }
      } catch (err) {
        console.error('Error fetching uploader email:', err);
      }
    };
    fetchUploaderEmail();
  }, []);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      setUploadStatus('Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const res = await axios.post('http://localhost:5000/api/videos/upload-home-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setUploadStatus(res.data.message || 'Upload successful!');

      const emailRes = await axios.get('http://localhost:5000/api/videos/get-last-uploadedby');
      if (emailRes.data.email) {
        setUploadedByEmail(emailRes.data.email);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '600px',
      margin: '40px auto',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Upload Home Page Video</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <input 
          type="file" 
          accept="video/mp4" 
          onChange={handleFileChange}
          style={{
            border: '1px solid #ccc',
            padding: '6px 10px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
        />
        <button 
          onClick={handleUpload}
          style={{
            backgroundColor: '#d89000',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
        >
          Upload
        </button>
      </div>

      {uploadStatus && (
        <p style={{ color: uploadStatus.includes('failed') ? 'red' : 'green', marginBottom: '10px' }}>
          {uploadStatus}
        </p>
      )}

      {uploadedByEmail && (
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#000'
        }}>
          <span style={{ color: '#333', fontWeight: 'bold' }}>Last uploaded by admin:</span> {uploadedByEmail}
        </p>
      )}
    </div>
  );
};

export default Homevideo;
