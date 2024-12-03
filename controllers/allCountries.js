const States = require('country-state-city').State
const Country = require('country-state-city').Country
const City = require('country-state-city').City

const getCountries = async(req, res)=>{
    try {
        const countries = await Country.getAllCountries();
        if(!countries){
            return res.status(400).json({message:"Countries not Found"})
        }
        res.status(200).json({countries})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}
const getStates = async(req, res)=>{
    const isCode = req.params.isCode;
    try {
        const states = await States.getStatesOfCountry(`${isCode}`);
        if(!states){
            return res.status(400).json({message:"States not Found"})
        }
        res.status(200).json({states})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}
const getCities = async(req, res)=>{
    const countryCode = req.params.countryCode;
    const stateCode = req.params.stateCode;
    try {
        const city = await City.getCitiesOfState(countryCode, stateCode);
        if(!city){
            return res.status(400).json({message:"Cities not Found"})
        }
        res.status(200).json({city})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = {getCountries, getStates, getCities}