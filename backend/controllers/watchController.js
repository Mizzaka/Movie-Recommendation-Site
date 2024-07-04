const Watchlist = require('../models/watchModel');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

const addToWatchlist = async (req, res) => {
    const userId = req.user._id;
    const { itemId, itemType } = req.body;
  
    if (!['movie', 'series'].includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' });
    }
  
    try {
      console.log(`User ID: ${userId}, Item ID: ${itemId}, Item Type: ${itemType}`);
  
      const Model = itemType === 'movie' ? Movie : Series;
      const item = await Model.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      const existingItem = await Watchlist.findOne({ user: userId, item: itemId, itemType });
      if (existingItem) {
        return res.status(400).json({ message: 'Item already in watchlist' });
      }
  
      const newItem = new Watchlist({ user: userId, item: itemId, itemType });
      await newItem.save();
  
      console.log('New watchlist item saved:', newItem);
      res.status(200).json(newItem);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      res.status(500).json({ message: error.message });
    }
  };


const getWatchlist = async (req, res) => {
    const userId = req.user._id;

    try {
        const watchlist = await Watchlist.find({ user: userId })
          .populate('item')
          .sort({ addedAt: -1});
        

        res.status(200).json(watchlist);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addToWatchlist, getWatchlist };