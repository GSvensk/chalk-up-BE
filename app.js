const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')
const sessionsRouter = require('./controllers/sessions')
const usersRouter = require('./controllers/users')

try {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connecting to', config.MONGODB_URI)
} catch (error) {
    console.log('mongoose connection failed')
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionsRouter)

module.exports = app