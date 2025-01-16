const express = require('express');
const router = express.Router();
const courierController = require('../controller/courierController');

router.post('/createCourier', courierController.createCourier);
router.put('/update', courierController.updateCourier);
router.delete('/delete', courierController.deleteCourier);
router.get('/getAll', courierController.getAllCouriers);
router.get('/getById',courierController.getCourierById);

module.exports = router;