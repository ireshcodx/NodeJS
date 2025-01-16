require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const movieRoutes = require('./routes/movieRoutes');
const createLogger = require('./logs/logger');

const logger = createLogger(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'./Public')));

app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log('Server is running on port', PORT);
});
