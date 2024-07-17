const express = require('express');
const { getTrendingItems, incrementViews } = require('../controllers/trendingController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getTrendingItems);
router.post('/increment-views', protect, incrementViews);

module.exports = router;