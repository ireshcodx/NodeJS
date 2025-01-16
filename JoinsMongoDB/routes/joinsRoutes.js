const express = require('express');
const router = express.Router();
const joinsController = require('../controller/joins.Controller');

//! routes for joins
router.get('/customerpackages', joinsController.getCustomerWithPackages);
router.get('/packagescourier', joinsController.getPackagesWithCourierDetails);
router.get('/deliveryroutescourier', joinsController.getDeliveryRouteWithCourier);
router.get('/completepackagedetails', joinsController.getCompletePackageDetails);

module.exports = router;