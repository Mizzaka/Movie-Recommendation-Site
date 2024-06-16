const express = require('express')
const {
    createMovie,
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie
} = require('../controllers/movieContrller')

const router = express.Router()

//GET all workouts
router.get('/', getMovies)

//GET a single workout
router.get('/:id', getMovie)


//POST a new workout
router.post('/', createMovie)


// DELETE a workout
router.delete('/:id',  deleteMovie)

// UPDATE a workout
router.patch('/:id', updateMovie )


module.exports = router