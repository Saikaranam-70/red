const express = require('express');
const { sendNotification } = require('../controllers/notificationController');
const { sendEmailNotification } = require('../controllers/emailnotificationController');

const router = express.Router();


router.post('/send/:donorId', sendNotification);
router.post('/sendNotification', sendEmailNotification)

module.exports = router;