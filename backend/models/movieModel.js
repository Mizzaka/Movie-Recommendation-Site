const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type:String,
        required: true
    },

    category: {
        type:String,
        required:true
    },

    moviedate: {
        type: Number,
        required: true
    },
    
    ratings:{
        type: Number,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    image: {
        type: String,
        required:  true
    },

    views: {
        type: Number,
        default : 0

    },

    watchlistAdds: {
        type: Number,
        default: 0
    },

    interactions: [{ userId: mongoose.Schema.Types.ObjectId, type: String, timestamp: Date }],
    
    trendingScore: { type: Number, default: 0 }

});

module.exports = mongoose.model('movie', movieSchema)