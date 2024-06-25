const Series = require('../models/seriesModel')
const mongoose = require('mongoose')


// get all series

const getAllSeries = async (req,res) => {
    const serieses = await Series.find({}).sort({createAt: -1})

    res.status(200).json(serieses)
};

// get a single series
const getSeries = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findById(id)

    if (!series) {
        return res.status(404).json({error: 'No such series'})
    }

    res.status(200).json(series)
};

// create new series

const createSeries = async (req, res) => {
    const {title, category, moviedate, ratings, description, season} = req.body

    //add doc to db

    try {
        const series = await Series.create({title, category, moviedate, ratings, description, season})
        res.status(200).json(series)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// DELETE a series
const deleteSeries = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findByIdAndDelete({_id: id})

    
    if (!series) {
        return res.status(400).json({error: 'No such series'})
    }

    res.status(200).json(series)
}

// update a series
const updateSeries = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findByIdAndUpdate({_id: id},{
       ...req.body 
    })

    if (!series) {
        return res.status(400).json({error: 'No such series'})
    }

    res.status(200).json(series)


}


module.exports = {

    getAllSeries,
    getSeries,
    createSeries,
    deleteSeries,
    updateSeries
};
