const express = require('express');
const courierRoutes = require('./routes/courierRoutes');
const customerRoutes = require('./routes/customerRoutes');
const packageRoutes = require('./routes/packageRoutes');
const deliveryRouteRoutes = require('./routes/deliveryRouteRoutes');
const joinRoutes = require('./routes/joinsRoutes')
const connectDB = require('./config/connection');
require('dotenv').config();

const port = process.env.PORT || 3000;
const DBURL = process.env.MONGO_URL;
// console.log('MongoDB URL:', DBURL);
const app = express();
app.use(express.json());

connectDB(DBURL);

//! Routes
app.use('/couriers', courierRoutes);
app.use('/customers', customerRoutes);
app.use('/packages', packageRoutes);
app.use('/deliveryRoutes', deliveryRouteRoutes);
// app.use('/joins',joinRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
