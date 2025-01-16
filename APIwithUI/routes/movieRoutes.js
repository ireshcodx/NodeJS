const express = require('express');
const { validateAndFetchMovies } = require('../controllers/movieController');

const router = express.Router();

router.post('/', validateAndFetchMovies);

module.exports = router;
