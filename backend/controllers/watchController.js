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
        const existingItem = await Watchlist.findOne({ user: userId, item: itemId, itemType });
        if (existingItem) {
            return res.status(400).json({ message: 'Item alredy in watchlist' });

        }

        const newItem = new Watchlist({ user: userId, item: itemId, itemType });
        await newItem.save();

        res.status(200).json(newItem);

    } catch (error) {
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