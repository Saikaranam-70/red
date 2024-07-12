const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config();
const secretKey = process.env.MY_NAME


const addUser = async(req, res)=>{
    const {email, password, name,mobilenumber, bloodgroup, state, city} = req.body;

    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const usersSchema = new User({
            email, 
            password:hashedPassword,
            name,
            mobilenumber,
            bloodgroup,
            state,
            city
        })
        await usersSchema.save();
        res.status(200).json({success:"User Added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        const userPassword = await bcrypt.compare(password, user.password)
        if(!user || !userPassword){
            return res.status(400).json({message:"Enter a valid password or Email"})
        }
        const token = jwt.sign({userId :user._id}, secretKey, {expiresIn:'1hr'})

        const userId =user._id;
        const userName = user.name

        res.status(200).json({success:"Login success", token, userId, userName})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}
const getDonors = async(req, res)=>{
    const {state, city, bloodgroup} = req.body;
    try {
        const donor = await User.find({state, city, bloodgroup})
        if(!donor){
            return res.status(400).json({message:"Donor not found"})
        }
        res.status(200).json({donor})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports ={addUser, loginUser, getDonors}