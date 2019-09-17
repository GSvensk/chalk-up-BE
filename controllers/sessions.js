const sessionsRouter = require('express').Router()
const Session = require('../models/session')
const User = require('../models/user')
const tokenChecker = require('../utils/token_checker')

sessionsRouter.use(tokenChecker)

sessionsRouter.post('/', async (request, response, next) => {

    const body = request.body

    try {
        //request.userId comes from tokenChecker middleware        
        const user = await User.findById(request.userId)
        
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