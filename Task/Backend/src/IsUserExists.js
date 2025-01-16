const userData = require('../Data/Users');

const userExists = (data) => {
    const userName = userData.some(user => user.username === data.username);
    const userEmail = userData.some(user => user.email === data.email);
    const userPassword = userData.some(user => user.password === data.password);
    if (userName && userEmail && userPassword) return true;
    else return false;
}

module.exports = userExists;