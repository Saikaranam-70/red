const Donor = require('../models/Donor')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

const secretKey = process.env.MY_NAME


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5500/auth/google/callback",
    scope:['profile','email']
},
async(accessToken, refreshToken, profile, done)=>{
    try {
        const donor = await Donor.findOne({email:profile.emails[0].value})
        if(!donor){
            const newDonor = new Donor({
                email: profile.emails[0].value,
                name:profile.displayName,
                password:null
            })
            await newDonor.save();
        }
        const token = jwt.sign({donorId: donor._id},secretKey, {expiresIn:'1h'})
        donor.token = token
        
        done(null, donor)
    } catch (error) {
        console.log(error)
        done(error, null)
    }
}
))
passport.serializeUser((donor, done)=>{
    done(null, donor.id)
})

passport.deserializeUser(async (id, done)=>{
    try {
        const donor = await Donor.findById(id)

        done(null, donor)
    } catch (error) {
        done(err, null)
    }
})
module.exports = passport   