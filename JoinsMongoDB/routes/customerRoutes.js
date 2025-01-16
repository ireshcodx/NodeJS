const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.Controller');

//! Routes
router.post('/addCustomer', customerController.addCustomer); 
router.get('/getAll', customerController.getAllCustomers);        
router.get('/getcustomerbyId/:id', customerController.getCustomerById);    
router.put('/updatecustomer/:id', customerController.updateCustomer);     
router.delete('/deletecustomer/:id', customerController.deleteCustomer);

router.get('/PackageAndDeliveryRoute/:id',customerController.joinPackageAndDeliveryRoute);
router.get('/getCustomerAndRoutesByDeliveryRouteId/:id',customerController.getCustomerAndRoutesByDeliveryRouteId)
module.exports = router;
