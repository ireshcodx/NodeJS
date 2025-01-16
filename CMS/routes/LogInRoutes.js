const express = require('express');
const logIncontroller = require('../controllers/logInController')
const router = express.Router();

router.post('/logIn',logIncontroller.userLogIn);

module.exports = router;