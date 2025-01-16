const You = require('../Model/youModel');

const getAll = async (meData) => {
    const you = new You(meData);
    return await you.save();
}
module.exports = { getAll };