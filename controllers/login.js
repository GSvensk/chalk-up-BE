const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    let passwordCorrect = false

    if (user !== null && await bcrypt.compare(body.password, user.passwordHash)) {
        passwordCorrect = true
    }

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    response
        .status(200)
        .send({
            username: user.username,
            name: user.name
        })
})

module.exports = loginRouter