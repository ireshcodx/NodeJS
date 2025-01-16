require('dotenv').config();
const { Sequelize } = require('sequelize');
const { logger } = require('../utils/logger');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (msg) => logger.info(msg),
});

sequelize
  .authenticate()
  .then(() => logger.info('Connected to database'))
  .catch((err) => logger.error(`${new Date().toISOString()} [database.js] error: ${err.message}`));

module.exports = sequelize;