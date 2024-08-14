import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/series');
        setSeries(response.data);
        console.log(response.data);  // Log the response to check URLs
      } catch (err) {
        setError('Failed to fetch Series.');
      }
    };

    fetchSeries();
  }, []);

  return (
    <div>
      //Temp
      <h1 className='text-white'>series List</h1>
      {error && <p>{error}</p>}
      <ul>
        {series.map(series => (
          <li key={series._id}>
            <h2>{series.title}</h2>
            <p>Category: {series.category}</p>
            <p>Movie Date: {series.moviedate}</p>
            <p>Ratings: {series.ratings}</p>
            <p>Description: {series.description}</p>
            <p>Season: {series.season}</p>
            <img src={series.imageUrl} alt={series.title} style={{ width: '200px', height: 'auto' }} />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
