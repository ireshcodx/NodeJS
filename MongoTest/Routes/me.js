const express = require('express');
const router = express.Router();
const meController = require('../controller/meController');

router.get('/',meController.getAll);

module.exports = router;