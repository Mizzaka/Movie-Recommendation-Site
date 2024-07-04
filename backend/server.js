require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const movieRoutes = require('./routes/movies')
const seriesRoutes = require('./routes/series')
const userRoutes = require('./routes/user')
const watchlistRoutes = require('./routes/watchlist');

const app = express()

// Enable CORS for all requests
app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/movies',movieRoutes)
app.use('/api/series',seriesRoutes)
app.use('/api/users',userRoutes)
app.use('/api/watchlist', watchlistRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
     })
    })
    .catch((error) =>{
        console.log(error)
    })
