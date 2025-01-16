const express = require('express');
const app = express();
const courierRoutes = require('./courierRoutes');
const customerRoutes = require('./customerRoutes');
const packageRoutes = require('./packageRoutes');
const loginRoutes = require('./LogInRoutes')

//? routes
app.use('/couriers', courierRoutes);
app.use('/customers', customerRoutes);
app.use('/packages', packageRoutes);
app.use('/user',loginRoutes)

module.exports = app;