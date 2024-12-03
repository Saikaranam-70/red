const jwt = require('jsonwebtoken')
const Donor = require('../models/Donor')
const dotEnv = require('dotenv')

dotEnv.config()
const secretKey = process.env.MY_NAME

const verifyToken = async(req, res, next)=>{
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await Donor.findById(decoded.userId)
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        req.userId = user._id
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }
}

module.exports = {verifyToken}