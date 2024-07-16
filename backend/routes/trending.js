const express = require('express');
const { getTrendingItems, incrementViews } = require('../controllers/trendingController');

const router = express.Router();

router.get('/', getTrendingItems);
router.post('/increment-views', incrementViews);

module.exports = router;