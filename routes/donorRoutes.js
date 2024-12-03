const express = require('express');
const { addDonor, loginDonor } = require('../controllers/donorController');

const router = express.Router();

router.post('/register',addDonor);
router.post('/login', loginDonor)

module.exports = router