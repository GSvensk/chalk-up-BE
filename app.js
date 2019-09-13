const express = require('express')
const app = express()
const mongoose = require('moongoose')
const config = require('./utils/config')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
console.log('connecting to', config.MONGODB_URI)

app.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = app