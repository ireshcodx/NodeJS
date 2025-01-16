const express = require('express');
const connectDB = require('./config/connection');
const meRoutes= require('./Routes/me');
const youRoutes = require('./Routes/you')
const dbUrl = 'mongodb+srv://ireshgiprogrammer:wCwOpzRudep3k9rk@practicecluster.ofpsx.mongodb.net/JointsPractice?retryWrites=true&w=majority&appName=PracticeCluster'
connectDB(dbUrl);

const app = express();

app.use(express.json());

app.use('/me',meRoutes);
app.use('/you',youRoutes);

app.listen(3000,()=>{
    console.log('server running');
})