const express = require('express');
const cors = require('cors');
const isValidUser = require('./IsUserExists')
const validator = require('../Middleware/Validations/Validate')
const app= express();

app.use(cors());
app.use(express.json());

app.listen(3000,()=>{
    console.log('server running ');
});

app.get('/msg',(req,res) => {
    res.json({'message':"hello Iresh"})
})

app.post('/login',(req,res,next) => {
    const data = req.body;
    const response = validator(data);
    console.log(data);
    if(response.status==406){
        console.log(response.error);
        return res.status(400).json(response.error);
    }
    else{
        if(!isValidUser(data)){
            return res.status(401).json("Invalid user");
        }
        return res.status(200).json(data);
    }
});