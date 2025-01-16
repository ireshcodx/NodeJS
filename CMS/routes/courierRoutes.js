const express = require('express');
const courierController = require('../controllers/courierController');
const verifyToken = require('../middleware/verifyToken');
const checkUserRole = require('../middleware/authrise');
const router = express.Router();


router.get('/getAll', verifyToken , courierController.getAllCouriers);
router.get('/getCourierById/:id',verifyToken, courierController.getCourierById);
router.post('/createCourier', verifyToken, courierController.createCourier);
router.put('/updateCourier/:id', verifyToken, courierController.updateCourier);
router.delete('/deleteCourier/:id', verifyToken, checkUserRole,courierController.deleteCourier);

//! joins Route
router.get('/getCourierByIdWithCustomer/:id', verifyToken, courierController.getCourierByIdWithCustomer);
router.get('/getAllCouriersWithCustomers',verifyToken, courierController.getAllCouriersWithCustomers);

module.exports = router;