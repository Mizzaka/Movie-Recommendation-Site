import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Import your AuthContext

const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user info from AuthContext
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = async (itemId, itemType) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/watchlist/add', { itemId, itemType }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWatchlist([...watchlist, response.data]);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  };

  // Add more functions like removeFromWatchlist if needed

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export { WatchlistContext, WatchlistProvider };
