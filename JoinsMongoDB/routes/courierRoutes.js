const express = require('express');
const router = express.Router();
const courierController = require('../controller/courier.controller');


router.post('/addCourier', courierController.addCourier);
router.get('/getAll', courierController.getAllCouriers);
router.get('/getCourierById/:id', courierController.getCourierById);
router.put('/updateCourier/:id', courierController.updateCourier);
router.delete('/deleteCourier/:id', courierController.deleteCourier);

router.post('/joinCourierAndCustomer/:id',courierController.joinCourierAndCustomer);

module.exports = router;