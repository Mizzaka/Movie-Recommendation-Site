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
    }

})

module.exports = mongoose.model('movie', movieSchema)