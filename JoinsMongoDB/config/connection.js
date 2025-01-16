const mongoose = require('mongoose');
const logger = require('../logs/logger');

const connectDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10
    });

    logger.info('Connected to MongoDB');
    console.log('Connected to MongoDB');
  } catch (error) {
    logger.error('DB Connection Error', error);
    console.log('DB Connection Error', error);
    return;
  }
};

module.exports = connectDB;