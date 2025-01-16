const validateCategory = require('../middleware/validations');
const fetchAPI = require('../Services/fetchData');
const createLogger = require('../logs/logger');
const logger = createLogger(__filename);
// console.log('from movieController ',logger);


const validateAndFetchMovies = async (req, res) => {
    const { category } = req.body;

    if (!category) {
        logger.error('Category is required but missing');
        return res.status(400).json({ message: 'Category is required' });
    }

    // Validate category
    const validation = validateCategory({ category });
    if (!validation.isValid) {
        logger.error(`Invalid category: ${validation.error}`);
        return res.status(400).json({ message: validation.error });
    }

    try {
        let data;
        // console.log(category,'from movieController');
        if (category === 'trendingmovies') {
            data = await fetchAPI('trending/movie/day');
        } else if (category === 'topratedmovies') {
            data = await fetchAPI('movie/top_rated');
        }  else if (category === 'trendingtvshows'){
            data = await fetchAPI('trending/tv/day');
        } else if(category === 'popularmovies'){
            data = await fetchAPI('movie/popular')
        }else {
            logger.error('Invalid category type provided');
            return res.status(400).json({ message: 'Invalid category type' });
        }

        logger.info('Movies fetched successfully');
        res.status(200).json({ message: 'Movies Fetched Buddy ', data });
    } catch (error) {
        logger.error(`Error in  fetching movies: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { validateAndFetchMovies };