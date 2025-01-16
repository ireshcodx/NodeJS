const express = require('express');
const router = express.Router();
const youController = require('../controller/youController');

router.get('/',youController.getAll);

module.exports = router;