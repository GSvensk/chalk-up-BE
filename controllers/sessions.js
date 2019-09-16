const sessionsRouter = require('express').Router()
const Session = require('../models/session')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

sessionsRouter.get('/', async (request, response, next) => {
    try {
        const sessions = await Session
            .find({})

        response.json(sessions.map(session => session.toJSON()))
    } catch (error) {
        next(error)
    }
})

sessionsRouter.post('/', async (request, response, next) => {

    const body = request.body
    const token = request.token

    try {

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const session = new Session({
            dateTime: body.dateTime,
            location: body.location,
            creator: user._id,
            participants: body.participants,
            info: body.info
        })

        const savedSession = await session.save()
        user.sessions = user.sessions.concat(savedSession._id)
        await user.save()
        response.json(savedSession.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = sessionsRouter