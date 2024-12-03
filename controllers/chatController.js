const Chat = require('../models/Chat')


const send = async(req, res)=>{
    const {senderId, receiverId, message} = req.body;
    console.log(senderId, message)
    try {
        const chatMessage = new Chat({
            senderId,
            receiverId,
            message
        })
        await chatMessage.save()
        res.status(200).json({ success: "Message sent success", chatMessage});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
}
const getMsg = async(req, res)=>{
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId

    try {
        const messages = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timeStamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
}

module.exports={send, getMsg}