const logger = require('../logs/logger');

const checkUserRole = (req, res, next) => {
    try {
        const userRole = req.decodedUser.role;

        if (userRole === 0) {
            logger.warn('[checkUserRole.js] User with role 0 is not allowed to update');
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }

        logger.info('[checkUserRole.js] User has sufficient permissions');
        next();
    } catch (error) {
        logger.error('[checkUserRole.js] Error in role check middleware');
        res.status(500).json({ error: 'An internal server error occurred.', message: error.message });
    }
};

module.exports = checkUserRole;