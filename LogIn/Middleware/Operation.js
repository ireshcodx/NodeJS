const validator = require('./Validation/Validation');
const prompt = require('prompt-sync')();

let username;
let email;
let phoneNumber;
let password;
let confirmPassword;
let country;
let city;
let state;
let pinCode;

const getDetails = () =>{
    username= prompt('Enter Your Username -> ');
    email= prompt('Enter Your E-Mail Address -> ');
    phoneNumber= prompt('Enter Your Phone Number -> ');
    password= prompt('Enter Your password -> ');
    confirmPassword= prompt('Enter Your password to confirm -> ');
    country= prompt('Enter Your Country -> ');
    state= prompt('Enter Your State -> ');
    city= prompt('Enter Your City -> ');
    pinCode= prompt('Enter Your Pin Code -> ');

    const user = {
        username,
        email,
        phoneNumber,
        password,
        confirmPassword,
        address:{
            country,
            state,
            city,
            pinCode
        }
    }
    return user;
}

const validateUser = () => {
    const user = getDetails();
    const validatedResponse = validator(user);
    if(validatedResponse.status == 406){
        // console.log("You are not a valid user");
        // console.log('From Operation',validatedResponse);
        const response = {
            message:"You're not a valid user",
            result:validatedResponse
        }
        // console.log(object);
        return response;
    }
    else{
        // console.log('You are a valid user');
        // console.log(validatedResponse.response);
        const response = {
            message:"You're a valid user",
            result:validatedResponse.response
        }
        return response;
    }
}

// validateUser();
module.exports = validateUser;