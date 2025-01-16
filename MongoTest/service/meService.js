const Me = require('../Model/meModel');

const getAll = async (meData) => {
    const me = new Me(meData);
    return await me.save();
}
module.exports = { getAll };