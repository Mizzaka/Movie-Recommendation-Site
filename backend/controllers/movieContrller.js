const Movie = require('../models/movieModel')
const mongoose = require('mongoose')

// get all workouts
const getMovies = async (req, res) =>{
    const movies = await Movie.find({}).sort({createAt: -1})

    res.status(200).json(movies)
}

// get a single workouts
const getMovie = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such movie'})
    }

    const movie = await Movie.findById(id)

    if (!movie) {
        return res.status(404).json({error: 'No such movie'})
    }

    res.status(200).json(movie)
}


// create new workout
const createMovie = async (req, res) => {
    const {title, category, moviedate, ratings, description} = req.body

    try {
      const movie = await Movie.create({title, category, moviedate, ratings, description})
      res.status(200).json(movie)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteMovie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'})
    }

    const movie = await Movie.findByIdAndDelete({_id: id})

    
    if (!movie) {
        return res.status(400).json({error: 'No such movie'})
    }

    res.status(200).json(movie)
}

// update a workout
const updateMovie = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'})
    }

    const movie = await Movie.findByIdAndUpdate({_id: id},{
       ...req.body 
    })

    if (!movie) {
        return res.status(400).json({error: 'No such movie'})
    }

    res.status(200).json(movie)


}


module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
    
}