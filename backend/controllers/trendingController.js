const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');


const incrementViews = async (itemId, type) => {
    if (type === 'movie') {
        await Movie.findByIdAndUpdate(itemId, { $inc: { views: 1 } });
    } else if (type === 'series') {
        await Series.findByIdAndUpdate(itemId, { $inc: { views: 1 } });
    }
};

const incrementWatchlistAdds = async (itemId, type) => {
    if ( type === 'movie') {
        await Movie.findByIdAndUpdate(itemId, { $inc: { watchlistAdds: 1 } });
    } else if (type === 'series') {
        await Series.findByIdAndUpdate(itemId, { $inc: { watchlistAdds: 1 } });
}

};


const getTrendingItems = async (req, res) => {
    try {
        const movies = await Movie.find();
        const series = await Series.find();

        const calculateTimeSinceRelese = (releaseDate) => {
            const now = new Date();
            const release = new Date(releaseDate);
            return (now - release) / (1000 * 60 * 60 * 24); // days since release
        };

        const calculateTrendingScore = (views, ratings, watchlistAdds, timeSinceRelease, baseScore = 100) => {
            const viewWeight = 0.4;
            const ratingWeight = 0.3;
            const watchlistWeight = 0.2;
            const timeDecay = 0.1;

            const timeFactor = Math.exp(-timeDecay * timeSinceRelease);
            const score = baseScore * (
                (viewWeight * views) + 
                (ratingWeight * ratings) +
                (watchlistWeight * watchlistAdds)
            ) * timeFactor;

            return score;
        };

        const items = [...movies, ...series].map(item => {
            const timeSinceRelease = calculateTimeSinceRelese(item.moviedate);
            const score = calculateTimeSinceRelese(
                item.views,
                item.ratings,
                item.watchlistAdds,
                timeSinceRelease
            );
            return { ...item._doc, score };
        });

        items.sort(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went worng' });
    }
};

module.exports = {
    incrementViews,
    incrementWatchlistAdds,
    getTrendingItems
};
