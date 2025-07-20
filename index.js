const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = require('./config/Db')
const router = require('./routes/UserRoutes')
connectDb()
const app = express()
 
app.use(express.json())
app.use('/api/users/',router)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/api/users`);
    
})