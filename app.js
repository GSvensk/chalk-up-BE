const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const sessionsRouter = require('./controllers/sessions')

try {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    console.log('connecting to', config.MONGODB_URI)
} catch (error) {
    console.log('mongoose connection failed')
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/sessions', sessionsRouter)

module.exports = app