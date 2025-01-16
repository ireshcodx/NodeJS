require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const createLogger = require('./logs/logger');

const logger = createLogger(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/movies', movieRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
