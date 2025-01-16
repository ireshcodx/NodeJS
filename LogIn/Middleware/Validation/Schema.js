const Joi = require('joi');

const userSchema = (user) => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(2)
            .max(10),

        email: Joi.string()
            .email()
            // .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
            .required(),

        phoneNumber: Joi.string()
            .regex(/^[0-9]{10}$/)
            .required(),

        password: Joi.string()
            .regex(/^[0-9a-zA-Z].{5,}$/),

        confirmPassword: Joi.ref('password'),

        address: Joi.object().keys({
            country: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            pinCode: Joi.string()
                        .regex(/^[0-9]{6}$/)
                        .required()
        }).required()
    })
    const result = schema.validate(user, { abortEarly: false });
    // console.log('from Schema',result);
    if (result.error) {
        const response = {
            error:result.error.details.map(error=> error.message)
        }
        // console.log('From Schema ', response.error);
        return response;
    }

    return result;

}

//todo Nested Object 
// const userInput = {
//      username: 'Yash', 
//      email: 'iresh@gmail.com', 
//      phoneNumber: '9881234018', 
//      password: 'ireh9', 
//      conformPassword: 'iresh9', 
//      address: { 
//         country: 'India', 
//         state: 'Maharashtra', 
//         city: 'Pune', 
//         pinCode: 4117244
//     }}
// const result = userSchema(userInput)
// console.log(result);

module.exports = userSchema;