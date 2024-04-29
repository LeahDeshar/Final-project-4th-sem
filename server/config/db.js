const mongoose = require('mongoose');
require('dotenv').config()


const connectDB = async (req,res)=>
{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Db connected ${mongoose.connection.host}`);
    } catch (error) {
        console.log("db connection failed",error);
    }
  
}

module.exports= connectDB;