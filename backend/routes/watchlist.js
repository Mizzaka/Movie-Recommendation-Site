const express = require('express');
const { addToWatchlist, getWatchlist } = require('../controllers/watchController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/add', protect, addToWatchlist);
router.get('/', protect, getWatchlist);

module.exports = router;