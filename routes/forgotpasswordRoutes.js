const express = require('express');
const { sendEmail, verifyOtp, updatePassword } = require('../controllers/ForgotPassword');


const router = express.Router();

router.post('/send-otp', sendEmail);
router.post('/verify-otp', verifyOtp)
router.post('/updated-password', updatePassword)

module.exports = router