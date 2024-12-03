const express = require('express');
const { verifyToken } = require('../middlewears/verifyToken');
const { sendEmail } = require('../controllers/contact');


const router = express.Router();

router.post('/send', verifyToken, sendEmail)

module.exports = router