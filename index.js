//Imports---------------------------
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyparser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const locationRoutes = require('./routes/locationRoutes')
const contactRoutes = require('./routes/contactRoutes')
const ForgotPassword = require('./routes/forgotpasswordRoutes')
const chatRoutes = require('./routes/chatRoutes')
const socketio = require('socket.io')
const http = require('http')
const donorRoutes = require('./routes/donorRoutes')

const session = require('express-session')

const passport = require('./controllers/googleAuthController')

const app = express()
const server = http.createServer(app);
const io = socketio(server);

dotEnv.config();
app.use(cors());
app.use(bodyparser.json())
//google auth
const secret = process.env.GOOGLE_CLIENT_SECRET
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google',passport.authenticate('google', {scope:['profile','email']}))

app.get('/auth/google/callback',
    passport.authenticate('google',{failureRedirect:'/'}),
    (req, res)=> {
        const token = req.user.token;
        const FRONTEND_URL = 'http://localhost:5173';
        res.redirect(`${FRONTEND_URL}/google-success?token=${token}`)
        // res.status(200).json({message:"Successfully authenticated", token})
    }
)

app.get('/logout', (req, res)=>{
    req.logOut((err)=>{
        if(err){ 
            return res.status(400).json("Logout failed")
        }
        res.status(200).json("Logout successfully")
    })
})



io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a specific chat room
    socket.on('joinRoom', ({ senderId, receiverId }) => {
        const room = [senderId, receiverId].sort().join('_');
        socket.join(room);
    });

    // Listen for chat messages
    socket.on('chatMessage', async ({ senderId, receiverId, message }) => {
        const room = [senderId, receiverId].sort().join('_');
        const chatMessage = new Chat({ senderId, receiverId, message });
        await chatMessage.save();
        io.to(room).emit('message', chatMessage); // Emit message to room
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const PORT = 5500;




//Database Connection --------------
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>console.log(error))

//Routes----------------


app.use('/user', userRoutes)
app.use('/notification', notificationRoutes)
app.use('/location', locationRoutes)
app.use('/mail', contactRoutes)
app.use('/forgot-password', ForgotPassword)
app.use('/chat', chatRoutes)
app.use('/donor', donorRoutes)

//PORT SETUP----------------------
app.listen(PORT, (req, res)=>{
    console.log(`Server started and running at ${PORT}`)
})

//Main Path------------------------
app.use('/', (req, res)=>{
    res.send("<h1>HELLO</H1>")
})