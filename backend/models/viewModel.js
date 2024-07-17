const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    contentType: { type: String, required: true },
    lastViewed: { type: Date, default: Date.now },
});

const View = mongoose.model('View', viewSchema);

module.exports = View;