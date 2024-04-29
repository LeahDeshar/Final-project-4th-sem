const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB  = require('./config/db');
const  authRouter  = require('./routes/authRoute');
const serviceRoute= require("./routes/serviceRoute")
const requestRoute = require("./routes/requestRoute")
const profileRouter = require("./routes/profileRoute")
const ratingRouter = require("./routes/ratingRoute")

const path = require('path');
require('dotenv').config();
const app = express();
// middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())



// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, './uploads'), { headers: { 'Content-Disposition': 'inline' } }));
app.use('/uploads', express.static('uploads'));


// test routes
app.get('/',(req,res) =>
{
    res.send('Server running');
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/service',serviceRoute)
app.use('/api/v1/request',requestRoute)
app.use('/api/v1/users',profileRouter)
app.use('/api/v1/rating',ratingRouter)



connectDB()
const PORT = process.env.PORT || 3002
app.listen(PORT,()=>
{
    console.log(`Server running on ${PORT}...`);
})

