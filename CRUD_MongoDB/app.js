const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./logs/logger');

const app = express();
const PORT = process.env.PORT || 3000;

//! Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use('/api/books', bookRoutes);

//todo Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  logger.error(`Failed to start the server: ${err.message}`);
});