const express = require('express');
const { getBooks, addBook } = require('../controller/bookcontroller');

const router = express.Router();

//todo Routes
router.get('/', getBooks);
router.post('/', addBook);

module.exports = router;
