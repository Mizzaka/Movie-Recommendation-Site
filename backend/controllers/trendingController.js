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

module.exports = { getTrendingItems} ;