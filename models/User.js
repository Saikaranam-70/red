const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },
    name:{
        type:String, 
        required:true
    },
    bloodgroup:{
        required:true,
        type:String
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})
const User = mongoose.model('User', userSchema);
module.exports= User