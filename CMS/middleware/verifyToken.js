const jwt = require('jsonwebtoken');
const logger = require('../logs/logger');
require('@dotenvx/dotenvx').config()
 
 
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            logger.warn('[verifyToken.js] Authorization header missing');
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
 
        let token;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = authHeader;
        }
        // console.log('from verify ',token);
        logger.info('[verifyToken.js] Token extracted successfully');
 
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            logger.info('[verifyToken.js] Token verified successfully');
            // console.log(decoded);
            if (decoded?.id) {
                req.decodedUser = decoded; //! Attach user info to req
                logger.info(`[verifyToken.js] Valid User in token: ${decoded.id}`);
                return next();
            } else {
                logger.warn('[verifyToken.js] Invalid User in token');
                return res.status(403).json({ error: 'Access denied. Invalid user.' });
            }
        } catch (error) {
            logger.error('[verifyToken.js] Token verification failed');
            return res.status(401).json({ error: 'Access denied. Invalid or expired token.', message: error.message });
        }
    } catch (error) {
        logger.error('[verifyToken.js] Error in token verification middleware');
        return res.status(500).json({ error: 'An internal server error occurred.', message: error.message });
    }
};
 
module.exports = verifyToken;