const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const watchliststSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType'
    },
    
    itemType: {
        type: String,
        required: true,
        enum: ['movie', 'series']
    },
    addedAt: { type:Date, default:Date.now }
});

module.exports = mongoose.model('Watchlist', watchliststSchema);