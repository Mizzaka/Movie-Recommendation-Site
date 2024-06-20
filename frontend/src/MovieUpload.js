// src/ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const MovieUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [moviedate, setMoviedate] = useState('');
  const [ratings, setRatings] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('moviedate', moviedate);
    formData.append('ratings', ratings);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:4000/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(`File uploaded successfully: ${response.data}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file.');
    }
  };

  return (
    <div>
      <h1>Movie Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Movie Date"
        value={moviedate}
        onChange={(e) => setMoviedate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ratings"
        value={ratings}
        onChange={(e) => setRatings(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default MovieUpload;
