
const nodemailer = require('nodemailer');
const User = require('../models/User');
const otp = require('otp-generator')
const bcryptjs = require('bcryptjs')


const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"saimanikantakaranam682@gmail.com",
        pass:"ffzf jxdr cixz fcxv"
    }
})
let userOtp ;

    userOtp = otp.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, digits:true, specialChars:false})


const sendEmail = async(req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Email is not registered"})
    }
    userOtp = otp.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, digits:true, specialChars:false})
    try {
        const mailOptions = {
            from: 'saimanikantakarnam682@gmail.com',
            to:email,
            subject:'RED CROSS CONNECT -  FORGOT PASSWORD',
            text:`Your OTP for Changing your password is ${userOtp}`
        }
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.error("error sending email", error);
                return res.status(500).json({error:'Failed to send confirmation email'})
            }else{
                console.error("Email sent:", info.response);
                return res.status(200).json({success:'success to send confirmation email'})
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to reset password'})
    }
}


const verifyOtp = async(req, res)=>{
    const {email, otp } = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        if(otp ==userOtp){
            return res.status(200).json({success:"OTP is verified successfully"})
        }else{
            res.status(400).json({message:"OTP invalid"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to reset password'})
    }
}
const updatePassword = async(req, res)=>{
    const {email, newPassword} = req.body;
    try {
        const updatedUser = await User.findOne({email})
        if(!updatedUser){
            return res.status(400).json({message:"User not found"})
        }
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        updatedUser.password = hashedPassword
        await updatedUser.save();
        res.status(200).json("Password updated Successfully....!!")
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to reset password'})
    }
}
module.exports ={sendEmail, verifyOtp, updatePassword}