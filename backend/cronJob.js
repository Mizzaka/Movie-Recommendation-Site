const cron = require('node-cron');
const updateTrendingScores = require('./utils/calculateTrendingScore');

cron.schedule('0 * * * *', async () => {
    await updateTrendingScores();
});