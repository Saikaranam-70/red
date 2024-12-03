const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    name:{
        type:String,
        required:true
    }
})
const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor