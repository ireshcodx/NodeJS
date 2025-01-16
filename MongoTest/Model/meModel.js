const mongoose = require('mongoose');

const MeSchema = new mongoose.Schema({
    vehical:{ type:String, required: true},
    Model:{ type:String, required: true, unique: true}
});

module.exports = mongoose.model('Me', MeSchema);