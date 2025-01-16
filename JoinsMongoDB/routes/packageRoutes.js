const express = require('express');
const router = express.Router();
const packageController = require('../controller/package.Controller');
const logger = require('../logs/logger');

router.post('/addpackage', packageController.addPackage);
router.get('/', packageController.getAllPackages);
router.get('/getpackagebyID/:id', packageController.getPackageById);
router.put('/updatepackage/:id', packageController.updatePackage);
router.delete('/deletepackage/:id', packageController.deletePackage); 

module.exports = router;
