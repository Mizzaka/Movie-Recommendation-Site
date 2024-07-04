import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const MovieCard = ({ id, image, title, moviedate, ratings, itemType }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleWatchlist = async () => {
    if (!user) return; // Check if user is logged in
    try {
      if (isInWatchlist) {
        // Remove from watchlist
        await axios.delete('/api/watchlist', {
          data: { itemId: id, itemType },
          headers: { Authorization: `Bearer ${user.token}` }
        });
      } else {
        // Add to watchlist
        await axios.post('/api/watchlist', {
          itemId: id,
          itemType
        }, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
    }
  };

  return (
    <div className="card relative">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-xl" />
      <div className="mx-0 mt-4">
        <span className="text-lg line-clamp-2 mb-2">{title}</span>
        <span className="block text-cusGray text-sm line-clamp-2">{moviedate}</span>
      </div>
      <div className="grid grid-cols-2 m-4">
        <div className="text-lg"></div>
        <div className="flex justify-end items-center -mt-32">
          <span className="text-sm font-semibold mr-1 mt-3">{ratings}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary -mr-3 mt-2">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isInWatchlist ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={`w-6 h-6 cursor-pointer ${isInWatchlist ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          onClick={toggleWatchlist}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

export default MovieCard;
