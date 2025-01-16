require('dotenv').config();
const createLogger = require('../logs/logger');

const logger = createLogger(__filename);

async function fetchAPI(url) {
    // console.log('from API',url);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
    };

    try {
        const response = await fetch(`${process.env.MOVIEDB_BASE_URL}/${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        logger.info(`API data fetched successfully for url: ${url}`);
        return data;
    } catch (error) {
        logger.error(`Error fetching API: ${error.message}`);
        throw error;
    }
}

module.exports = fetchAPI;