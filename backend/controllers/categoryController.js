const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');

const getCategoryItems = async (req, res) => {
    const { category } = req.params;

    try {
        const movies = await Movie.find({ category });
        const series = await Series.find({ category });

        res.status(200).json({ movies, series });
    } catch (error) {
        res.status(500).json( {error: 'Somthing went wrong ' });
    }
};


module.exports = {
    getCategoryItems,
};