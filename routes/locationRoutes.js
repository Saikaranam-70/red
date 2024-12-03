const express = require('express');
const { getCountries, getStates, getCities } = require('../controllers/allCountries');




const router = express.Router();
router.get('/country', getCountries)
router.get('/states/:isCode', getStates)
router.get('/cities/:countryCode/:stateCode', getCities)



module.exports = router