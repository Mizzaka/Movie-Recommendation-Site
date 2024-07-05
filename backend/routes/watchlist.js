const express = require('express');
const { addToWatchlist, getWatchlist, deleteFromWatchlist } = require('../controllers/watchController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/add', protect, addToWatchlist);
router.get('/', protect, getWatchlist);
router.delete('/', protect, deleteFromWatchlist);

module.exports = router;