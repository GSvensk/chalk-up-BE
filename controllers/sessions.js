const sessionsRouter = require('express').Router()
const Session = require('./../models/session')

sessionsRouter.get('/', async (request, response) => {
    try {
        const sessions = await Session
            .find({})

        response.json(sessions.map(session => session.toJSON()))
    } catch (error) {
        next(error)
    }
})

module.exports = sessionsRouter