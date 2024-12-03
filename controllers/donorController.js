const Donor = require('../models/Donor')
const dotEnv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



dotEnv.config();
const secretKey = process.env.MY_NAME



const addDonor = async(req, res)=>{
    const {email, password, name}=  req.body
    try {
        const donor = await Donor.findOne({email})
        if(donor){
            return res.status(400).json({message:"Donor email Already exists"})
        }
        const newDonor = new Donor({
            email,
            password: await bcrypt.hash(password, 10),
            name
        })
        await newDonor.save();
        res.status(200).json({success:"Donor added successfully"});

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
}
const loginDonor = async(req, res)=>{
    const {email, password} = req.body
    try {
        const donor = await Donor.findOne({email})
        const hashpassword = await bcrypt.compare(password, donor.password)
        if(!donor || !hashpassword){
            return res.status(400).json({message:"Enter a valid password or Email"})
        }
        const token = jwt.sign({userId :donor._id}, secretKey, {expiresIn:'1hr'})

        const userId = donor._id
        const userEmail = donor.email

        res.status(200).json({success:"Login success", token, userId, userEmail})


    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
}

module.exports =  {addDonor, loginDonor}
