import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MediaCard from '../components/MediaCard';

const Trending = () => {
    const [trendingData, setTrendingData] = useState({ movies: [], series: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingData = async () => {
            try{
              const response = await axios.get('http://localhost:4000/api/trending');
              setTrendingData(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        };

        fetchTrendingData();
    }, []);

  return (
    <div>
        {error && <p>{error}</p>}

        <h2>Trending Movies</h2>
        <div className="m-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {error && <p>{error}</p>}
              {trendingData.movies.map((movie) => (
                <a href="#" key={movie._id} >
                  <MediaCard
                    id={movie._id} // Use movie._id for the id
                    type="movie" // Set type to "movie"
                    image={movie.imageUrl}
                    title={movie.title}
                    releaseDate={movie.moviedate} // Make sure this matches your movie model property
                    ratings={movie.ratings}
                  />
                </a>
              ))}
            </div>
          </div>
    </div>
  )
}

export default Trending