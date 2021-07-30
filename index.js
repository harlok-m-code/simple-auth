require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/auth',router)

const start = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB)
        app.listen(PORT, ()=> {
            console.log(`Server started on port ${PORT} `)
        })
    } catch (error) {
        console.log(error)
    }
}

start()