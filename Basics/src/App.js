const {displayResponse,fetchData} = require('../Middleware/operation.js')

const user = fetchData();
displayResponse(user);