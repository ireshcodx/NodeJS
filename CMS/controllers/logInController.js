const logInService = require('../services/logInService');
const logger = require('../logs/logger');
const loginValidation = require('../middleware/validations/userSchema')

const userLogIn = async (req, res) => {
    try {
        const logInuser = req.body;
        const { error } = loginValidation.logInSchema(logInuser);
        if (error) {
            logger.error(`[logInController.js] Invalid input ${error.details[0].message}`);
            return res.status(401).json({
                message: 'Invalid inputs',
                error: error.details[0].message
            })
        }
        const user = await logInService.logIn(logInuser);
        // console.log('In userLogIn',user);
        if(user.error){
            logger.error(`[logInController.js] error in userLogIn ${user.error}`);
            return res.status(401).json({
                message: 'Invalid credentials',
                error: user.error
            })
        }
        return res.status(200).json({
            message: 'Log In Successfull',
            token: user.token
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { userLogIn };