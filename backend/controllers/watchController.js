const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const Watchlist = require('../models/watchModel');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  S3_BUCKET_NAME,
} = process.env;

// Initialize the S3 interface
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

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
        .sort({ addedAt: -1 });
  
      const updatedWatchlist = await Promise.all(watchlist.map(async (watchlistItem) => {
        const item = watchlistItem.item;
        let imageUrl = '';
  
        if (watchlistItem.itemType === 'movie' || watchlistItem.itemType === 'series') {
          const command = new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: item.image,  // Assuming 'item.image' holds the S3 key of the image
          });
          imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
        }
  
        return {
          ...watchlistItem._doc,
          item: {
            ...item._doc,
            imageUrl: imageUrl
          }
        };
      }));
  
      res.status(200).json(updatedWatchlist);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { addToWatchlist, getWatchlist };