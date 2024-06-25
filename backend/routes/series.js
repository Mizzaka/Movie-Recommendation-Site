const express = require('express')
const {
    createSeries,
    getAllSeries,
    getSeries,
    deleteSeries,
    updateSeries
} = require('../controllers/seriesController')

const router = express.Router()

//GET all Series
router.get('/', getAllSeries);

//GET single Series
router.get('/:id', getSeries);

//POST a new Series
router.post('/', createSeries );

//DELETE a series
router.delete('/:id', deleteSeries);

//UPDATE a series
router.patch('/:id', updateSeries);

module.exports = router;