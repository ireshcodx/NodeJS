const mongoose = require('mongoose');

const YouSchema = new mongoose.Schema({
    name:{ type:String, required: true},
    email:{ type:String, required: true, unique: true}
});

module.exports = mongoose.model('You', YouSchema);