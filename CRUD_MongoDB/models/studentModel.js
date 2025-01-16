const { getDB } = require('../config/database');

const studentCollection = () => getDB().collection('Testing.students');

module.exports = studentCollection;