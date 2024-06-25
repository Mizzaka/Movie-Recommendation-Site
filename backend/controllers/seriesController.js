const { S3Client, PutObjectCommand,GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Series = require('../models/seriesModel')
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

// get all series

const getAllSeries = async (req,res) => {
    const serieses = await Series.find({}).sort({createAt: -1});

    const updatedSeries = await Promise.all(serieses.map(async (series) => {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: series.image
        });
        const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return {
            ...series._doc,
            imageUrl: imageUrl
        };
    }));
    res.status(200).json(updatedSeries)
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
    upload.single('image')(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: 'Error uploading file' });
        }
        
        const {title, category, moviedate, ratings, description, season} = req.body
        const imageName = req.file.key; // Get the file name from S3

        try {
            const series = await Series.create({title, category, moviedate, ratings, description, season, image: imageName})
            res.status(200).json(series)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    });

    


    
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
