const youService = require('../service/youService');

const getAll = async (req,res) => {
    try {
        const result = await youService.getAll();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error})
    }
}
module.exports = {getAll};