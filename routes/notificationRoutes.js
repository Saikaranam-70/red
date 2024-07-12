const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();


router.post('/send/:donorId', sendNotification);

module.exports = router;