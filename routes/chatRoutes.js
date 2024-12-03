const express = require('express');
const {  getMsg, send } = require('../controllers/chatController');
const { verifyToken } = require('../middlewears/verifyToken');

const router = express.Router();

router.post('/sentMessage',verifyToken, send)
router.get('/history/:senderId/:receiverId', getMsg)

module.exports = router