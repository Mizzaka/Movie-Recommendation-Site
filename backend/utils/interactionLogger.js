const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

const logInteraction = async (itemId, userId, itemType, interactionType) => {
    const Model = itemType === 'movie' ? Movie : Series;
    const item = await Model.findById(itemId);
    item.interactions.push({ userId, type: interactionType, timestamp: new Date() });
    await item.save();
};

module.exports = logInteraction;