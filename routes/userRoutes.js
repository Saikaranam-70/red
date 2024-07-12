const express = require('express');
const { addUser, loginUser, getDonors } = require('../controllers/userController');
const verifyToken = require('../middlewears/verifyToken');

const router = express.Router();

router.post('/register', addUser)
router.post('/login', loginUser)
router.get('/getDonors', verifyToken, getDonors)

module.exports = router