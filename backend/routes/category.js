const express = require('express');
const router = express.Router();
const { getCategoryItems } = require('../controllers/categoryController');


// Route to get movies and series by category
router.get('/:category', getCategoryItems);

module.exports = router;