const sessionsRouter = require('express').Router()
const Session = require('./../models/session')

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

    try {
        const session = new Session({
            dateTime: body.dateTime,
            location: body.location,
            creator: body.creatorId,
            participants: body.participants,
            info: body.info
        })

        const savedSession = await session.save()
        response.json(savedSession.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = sessionsRouter