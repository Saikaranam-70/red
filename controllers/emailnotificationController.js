
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 587,
    secure:false,
    auth:{
        user:'saimanikantakaranam682@gmail.com',
        pass:'gpdn kwnq dprp wwqu'
    }
})
let generater;

const sendEmailNotification = async(req,res)=>{
    const {senderEmail, receiverEmail, name, number} = req.body
    try {

       const mailOptions = {
           from:senderEmail,
           to:receiverEmail,
           subject: 'Alert! Some One needs your Blood',
           text:`Hey mr/ms.${name} needs Your blood maybe Its Emergency Please contact Him His Mobile number is ${number}`
       }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.error(error);
            return res.status(500).json({ error: 'Failed to send OTP to email.' });
        }else{
            console.error('Email sent: ', info.response);
            return res.status(200).json({ message: 'Otp Sent successfully', emailOtp: generater });
        }
    })


    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}


module.exports = {sendEmailNotification};