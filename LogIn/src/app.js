const Validateuser = require('../Middleware/Operation')

const response = Validateuser();

console.log('<---------------------------------->');
console.log(response.message);
console.log('<---------------------------------->');
console.log(response.result.error ? response.result.error : response.result);