const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const { logger } = require('./utils/logger');

const app = express();

//! Middleware to parse JSON
app.use(bodyParser.json());

//! Log incoming requests
app.use((req, res, next) => {
  logger.info(`${new Date().toISOString()} [${req.method}] ${req.originalUrl}`);
  next();
});

//! Routes
app.use('/student', studentRoutes);

//! Error handler
app.use((err, req, res, next) => {
  logger.error(`${new Date().toISOString()} [app.js] error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

module.exports = app;