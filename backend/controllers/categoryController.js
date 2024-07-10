const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const { getSignedImageUrl } = require('../utils/s3Utils');

const getCategoryItems = async (req, res) => {
    const { category } = req.params;

    try {
        const movies = await Movie.find({ category });
        const series = await Series.find({ category });

        // GET signed URLs for movie images

        const updatedMovies = await Promise.all(
            movies.map(async (movie) => {
                const imageUrl = await getSignedImageUrl(movie.image);
                return { ...movie._doc, imageUrl };
            })
        );

        // GET signed URLs for series images
        const updatedSeries = await Promise.all(
            series.map(async(seriesItem) => {
                const imageUrl = await getSignedImageUrl(seriesItem.image);
                return { ...seriesItem._doc, imageUrl };
            })
        );

        res.status(200).json({ movies: updatedMovies, series: updatedSeries });
    } catch (error) {
        res.status(500).json( {error: 'Somthing went wrong ' });
    }
};


module.exports = {
    getCategoryItems,
};