//Imports---------------------------
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyparser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationRoutes')


const app = express()


const PORT = 5500;
dotEnv.config();
app.use(cors());


//Database Connection --------------
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>console.log(error))

//Routes----------------
app.use(bodyparser.json())
app.use('/user', userRoutes)
app.use('/notification', notificationRoutes)

//PORT SETUP----------------------
app.listen(PORT, (req, res)=>{
    console.log(`Server started and running at ${PORT}`)
})

//Main Path------------------------
app.use('/', (req, res)=>{
    res.send("<h1>HELLO</H1>")
})