const meService = require('../service/meService');

const getAll = async (req,res) => {
    try {
        const result = await meService.getAll();
        return res.status(200).json(result)
    } catch (error) {
       return res.status(400).send(error)
    }
}
module.exports = {getAll};