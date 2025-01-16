const express = require('express');
const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const verifyToken = require('../middleware/verifyToken');
const checkUserRole = require('../middleware/authrise');
const router = express.Router();

router.get('/getAll', verifyToken ,getAllCustomers);
router.get('/getCustomerById/:id', verifyToken, getCustomerById);
router.post('/createCustomer',createCustomer);
router.put('/updateCustomer/:id', verifyToken, updateCustomer);
router.delete('/deleteCustomer/:id', verifyToken, checkUserRole,deleteCustomer);

module.exports = router;
