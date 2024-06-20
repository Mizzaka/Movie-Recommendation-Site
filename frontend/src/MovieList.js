import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/movies');
        setMovies(response.data);
        console.log(response.data);  // Log the response to check URLs
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      {error && <p>{error}</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>Category: {movie.category}</p>
            <p>Movie Date: {movie.moviedate}</p>
            <p>Ratings: {movie.ratings}</p>
            <p>Description: {movie.description}</p>
            <img src={movie.imageUrl} alt={movie.title} style={{ width: '200px', height: 'auto' }} />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
