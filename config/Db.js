const { default: mongoose } = require('mongoose')

require('dotenv').config()

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected Successfully');
        
    } catch (error) {
        console.error('MongoDB Connection Failed:', err);
    }
}

module.exports = ConnectDB