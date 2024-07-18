const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

// Trending score calculation logic
function calculateTrendingScore(item) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const now = new Date();

    // Calculate recent interactions within the last 24 hours
    const recentInteractions = item.interactions.filter(interaction => (now - new Date(interaction.timestamp)) <= oneDay);
    const interactionScore = recentInteractions.length;

    // Ratings contribute to the score
    const ratingScore = item.ratings * 10; // Assuming ratings are on a scale of 1-10

    // Views and watchlist adds contribute to the score
    const viewScore = item.views * 0.6; // Adjust the weight as necessary
    const watchlistScore = item.watchlistAdds * 0.4; // Adjust the weight as necessary

    // Total trending score
    return interactionScore + ratingScore + viewScore + watchlistScore;
}

// Function to update trending scores
const updateTrendingScores = async () => {
    try {
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
        await updateScores(series);

        console.log('Trending scores updated successfully');
    } catch (error) {
        console.error('Error updating trending scores:', error);
    }
};

module.exports = updateTrendingScores;
