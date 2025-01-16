const express = require('express');
const packageController = require('../controllers/packageController');
const verifyToken = require('../middleware/verifyToken');
const checkUserRole = require('../middleware/authrise');
const router = express.Router();

router.get('/getAll', verifyToken,  packageController.getAllPackages);
router.get('/getPackageById/:id', verifyToken, packageController.getPackageById);
router.post('/createPackage/', verifyToken, packageController.createPackage);
router.put('/updatePackage/:id', verifyToken, packageController.updatePackage);
router.delete('/deletePackage/:id', verifyToken, checkUserRole,packageController.deletePackage);

module.exports = router;