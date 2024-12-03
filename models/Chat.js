const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    sendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donor'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donor'
    },
    message:{
        type:String,
        required:true
    },
    timeStamp:{
        type: Date,
        default:Date.now
    }
})
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat