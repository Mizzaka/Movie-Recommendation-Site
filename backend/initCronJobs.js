const cron = require('node-cron');
const updateTrendingScores = require('./utils/calculateTrendingScore'); // Ensure this path is correct

// Function to initialize trending scores on server start
const initializeTrendingScores = async () => {
    try {
        await updateTrendingScores();
        console.log('Initial trending scores updated');
    } catch (error) {
        console.error('Error updating initial trending scores:', error);
    }
};

// Schedule the cron job to run the trending score update every hour
const scheduleTrendingScoreUpdates = () => {
    cron.schedule('0 * * * *', async () => {
        await updateTrendingScores();
    });
};

// Export the functions
module.exports = {
    initializeTrendingScores,
    scheduleTrendingScoreUpdates
};
