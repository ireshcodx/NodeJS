const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const indexRoute = require('./routes/indexRoute')
dotenv.config();
const app = express();
app.use(express.json());

//? Routes
app.use('/api', indexRoute)

//! Start the server and sync models with the database
const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error.message);
    }
};

startServer();