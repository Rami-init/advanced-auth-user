const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('the mongoDB connected !');
}
module.exports = connectDB