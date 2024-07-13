const Movie = require('../models/movieModel');
const Series = require('../models.seriesModel');

function calculateTrendingScore(item) {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = new Date();
    const recentInteractions = item.interactions.filter(interactions => (now - new Date(interactions.timestamp)) <= oneDay);
    const interactionScore = recentInteractions.length;
    const ratingScore = item.ratings * 10; //ratings are one a scale of1-10
    return interactionScore + ratingScore;    
};

const updateTrendingScores = async () => {
    const movies = await Movie.find();
    const series = await Series.find();

    const updateScores = async (items) => {
        for (let item of items) {
            const score = calculateTrendingScore(item);
            item.trendingScore = score;
            await item.save();
        }
    };

    await updateScores(movies);
    await updateScores(sereis);
};

module.exports = updateTrendingScores;