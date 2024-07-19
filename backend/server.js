require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const movieRoutes = require('./routes/movies')
const seriesRoutes = require('./routes/series')
const userRoutes = require('./routes/user')
const watchlistRoutes = require('./routes/watchlist');
const categoryRoutes = require('./routes/category');
const trendingRoutes = require('./routes/trending');

const { initializeTrendingScores, scheduleTrendingScoreUpdates } = require('./initCronJobs'); // Import the functions

const app = express()

const PORT = process.env.PORT || 4000;

// Enable CORS for all requests
app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/movies',movieRoutes);
app.use('/api/series',seriesRoutes);
app.use('/api/users',userRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/trending', trendingRoutes);




// connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
      

    .then(() =>{
        console.log('Connected to the database');

        // Start the server
        app.listen(PORT, async () => {
            console.log(`Connected to db & listening on port ${PORT}`);
    
            // Initialize trending scores on server start
            await initializeTrendingScores();
    
            // Schedule the cron job to run the trending score update every hour
            scheduleTrendingScoreUpdates();
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
