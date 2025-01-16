const { userSchema } = require("./schema")

const validateUser = (user) =>{
    const validatedResponse = userSchema(user);

    if(validatedResponse.error){
        // console.log(validatedResponse.error.details[0].message);
        const validated = {
            error:validatedResponse.error.details[0].message,
            status:500
        }
        return validated;
    }
    else{
        const validated = {
            validatedResponse:validatedResponse,
            status:200
        }
        return validated;
    }
}

module.exports = {
    validateUser
}