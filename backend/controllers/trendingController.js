const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

const getTrendingItems = async (req, res) => {
    try {
      const trendingMovies = await Movie.find().sort({ trendingScore: -1 }).limit(10);
      const trendingSeries = await Series.find().sort({ trendingScore: -1 }).limit(10);
      res.json({ movies: trendingMovies, series: trendingSeries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const incrementViews = async (req, res) => {
  const { id, type } = req.body;

  try {
      if (type === 'movie') {
        await Movie.findByIdAndUpdate(id, { $inc: { views: 1 }})

      } else if (type === 'series') {
        await Series.findByIdAndUpdate(id, { $inc: { views: 1}});

      } else {
        return res.status(400).json({ message: 'Invalid type'});
      }

      res.status(200).json({ message: 'View count incremented' })
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrendingItems, incrementViews } ;