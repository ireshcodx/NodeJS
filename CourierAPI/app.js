require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb'); //! using MongoDB library
const courierRoutes = require('./routes/courierRoutes');
const logger = require('./logs/logger');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

//! Establish MongoDB connection
MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    logger.info('Connected to MongoDB');
    console.log('Connected to MongoDB');
    const db = client.db(DB_NAME);  //? Using the 'CourierDB' database
    app.locals.db = db;                 //? Attaching db to app
  })
  .catch(err => {
    logger.error('[app.js] DB Connection Error:', err);
    console.error('DB Connection Error:', err);
  });

app.use('/courier', courierRoutes);

app.listen(PORT, () => {
  logger.info('[app.js] server started on port ', PORT)
  console.log(`Server running on port ${PORT}`);
});
