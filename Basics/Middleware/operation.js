const validate = require('./Validation/validation.js');
const prompt = require('prompt-sync')();

let email;
let username;
let password;
let conform_password;

const fetchData = ()=>{
    email=prompt('Enter Your Email ->')
    username=prompt('Enter Your Username ->')
    password=prompt('Enter Your Password ->')
    conform_password=prompt('Conform Your Password ->')


    const user = {
        email,
        username,
        password,
        conform_password
    }

    return user;
}

const displayResponse = (user)=>{
    const response = validate.validateUser(user);
    // console.log(response);

    if(response.status == 200){
        console.log("Your're validate user ");
        console.log("===============================");
        console.log("Your Data is ",response);
        console.log("===============================");
    }
    else{
        console.log("Error is ",response);
    }
}

module.exports = {
    displayResponse,
    fetchData
}