const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const View = require('../models/viewModel');


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

// Get tending Items

const getTrendingItems = async (req, res) => {
    try {
      const trendingMovies = await Movie.find().sort({ trendingScore: -1 }).limit(10).lean();
      const trendingSeries = await Series.find().sort({ trendingScore: -1 }).limit(10).lean();

      const addImageUrl = async (item) => {
        const command = new GetObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: item.image,
        });
        const imageUrl = await getSignedUrl(s3, command, { expiresIn:3600 });
        return { ...item, imageUrl };

      };

      const moviesWithImageUrl = await Promise.all(trendingMovies.map(addImageUrl));
      const seriesWithImageUrl = await Promise.all(trendingSeries.map(addImageUrl));

      res.json({ movies: moviesWithImageUrl, series: seriesWithImageUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const incrementViews = async (req, res) => {
  const { id, type } = req.body;
  const userId = req.user._id; // Accessing user ID from the authenticated request

  try {
    // Define the threshold (e.g., 24 hours)
    const threshold = 24 * 60 * 60 * 1000;

    let item;
    if (type === 'movie') {
      item = await Movie.findById(id);
    } else if (type === 'series') {
      item = await Series.findById(id);
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find the view record for this user and content
    const viewRecord = await View.findOne({ userId, contentId: id, contentType: type });

    if (viewRecord) {
      // Check if the last view is within the threshold
      if (Date.now() - new Date(viewRecord.lastViewed).getTime() < threshold) {
        return res.status(200).json({ message: 'View not incremented, already viewed recently' });
      }

      // Update the last viewed timestamp
      viewRecord.lastViewed = Date.now();
      await viewRecord.save();
    } else {
      // Create a new view record
      await View.create({ userId, contentId: id, contentType: type, lastViewed: Date.now() });
    }

    // Increment the view count
    item.views += 1;
    await item.save();

    res.status(200).json({ message: 'View count incremented' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ message: error.message });
  }
};
  // try {
  //     if (type === 'movie') {
  //       await Movie.findByIdAndUpdate(id, { $inc: { views: 1 }})

  //     } else if (type === 'series') {
  //       await Series.findByIdAndUpdate(id, { $inc: { views: 1}});

  //     } else {
  //       return res.status(400).json({ message: 'Invalid type'});
  //     }

  //     res.status(200).json({ message: 'View count incremented' })
  // } catch (error) {
  //   console.error('Error incrementing view count:', error);
  //   res.status(500).json({ message: error.message });
  // }


module.exports = { getTrendingItems, incrementViews } ;