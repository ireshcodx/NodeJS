const express = require('express');
const router = express.Router();
const deliveryRouteController = require('../controller/deliveryRoute.Controller');

//todo DeliveryRoute Routes
router.post('/addDeliveryRoute', deliveryRouteController.addDeliveryRoute);
router.get('/getAllDeliveryRoutes', deliveryRouteController.getAllDeliveryRoutes);
router.get('/getDeliveryRouteById/:id', deliveryRouteController.getDeliveryRouteById);
router.put('/updateDeliveryRoute/:id', deliveryRouteController.updateDeliveryRoute);
router.delete('/deleteDeliveryRoute/:id', deliveryRouteController.deleteDeliveryRoute);

//! New routes for joining delivery route with customer or courier
router.post('/linkcustomer', deliveryRouteController.joinDeliveryRouteAndCustomer);
router.post('/linkcourier', deliveryRouteController.joinDeliveryRouteAndCourier);

module.exports = router;
