const { S3Client, PutObjectCommand,GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Movie = require('../models/movieModel')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  S3_BUCKET_NAME,
 
} = process.env;

// Initialize the S3 interface
const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

 // Configure multer to use multer-s3 for storage
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: S3_BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  });
  

// Controller functions for movies
const getMovies = async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });

  const updatedMovies = await Promise.all(movies.map(async (movie) => {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: movie.image,  // Assuming 'movie.image' holds the S3 key of the image
    });
    const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return {
      ...movie._doc,
      imageUrl: imageUrl
    };
  }));

  res.status(200).json(updatedMovies);
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
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'Error uploading file' });
      }
  
      const { title, category, moviedate, ratings, description } = req.body;
      const imageName = req.file.key; // Get the file name from S3
  
      try {
        const movie = await Movie.create({ title, category, moviedate, ratings, description, image: imageName });
        res.status(200).json(movie);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
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