const express = require('express');
const { getTrendingItems } = require('../controllers/trendingController');

const router = express.Router();

router.get('/api/trending', getTrendingItems);

module.exports = router;