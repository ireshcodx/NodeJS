const Joi = require('joi');


const userSchema = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
        conform_password: Joi.ref('password')
    })
    return schema.validate(user);
}

module.exports={
    userSchema
}