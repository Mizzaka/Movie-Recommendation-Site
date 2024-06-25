const mongoose = require('mongoose')

const Schema = mongoose.Schema

const seriesSchema = new Schema({
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

    season: {
        type:String,
        reuired: true
    },

   

})

module.exports = mongoose.model('series', seriesSchema)