
const User = require('../models/User')
const twilio = require('twilio')



const accountSid = 'ACd7b4301aa16f334ae40e8bd0ebcef2de';
const authToken = '0493a1e44eb9e7f15ab1024cb0d05024';
const client = twilio(accountSid, authToken)

const sendNotification = async(req, res)=>{
    const donorId = req.params.donorId;
    try {
        const user = await User.findById(donorId);
        if(!user){
            return res.status(400).json({message:"donor Not found"});
        }
        await client.messages.create({
            //messagingServiceSid: 'MGb2d03c4269fee32b8d3d3748874f6468',
            from: '+12512903766',
            to: user.mobilenumber,
            body: `Hey ${user.name}, Its Emergency Someone Needed Your Blood `
        });
        res.status(200).json({success: "Notification Sent Successfully...!!"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}
module.exports = {sendNotification}