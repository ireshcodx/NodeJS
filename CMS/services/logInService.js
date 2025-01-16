const { Users } = require('../models');
const logger = require('../logs/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const logIn = async (logInuser) => {
    try {
        const { email, password } = logInuser;
        // console.log(email);
        //! Find user by email
        const user = await Users.findOne({ where: { email } });
        // console.log(user);
        if (!user) {
            logger.error(`Login failed: User with email ${email} not found`);
            return { error: 'Invalid email or password' };
        }

        // console.log('In logIn service');
        //! Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('from service',isPasswordValid);
        if (!isPasswordValid) {
            logger.error(`Login failed: Incorrect password for email ${email}`);
            return { error: 'Invalid email or password' };
        }
        // console.log('Uasslksjlaks');
        //! Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        // console.log(token);
        logger.info(`User ${user.email} logged in successfully`);
        return { token };
    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        return { error: 'An error occurred during login' };
    }
};

module.exports = { logIn };
