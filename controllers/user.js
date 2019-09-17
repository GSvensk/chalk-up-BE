
const userRouter = require('express').Router()
const User = require('./../models/user')
const sortSessions = require('../utils/session_sort')

userRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id

        const user = await User
            .findById(id)
            .select({ "username": 1, "name": 1, "friends": 1})
            .populate('sessions')

        response.json(user.toJSON())
    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id/sessions', async (request, response, next) => {
    try {
        const id = request.params.id

        const user = await User
            .findById(id)
            .select({ "username": 1})
            .populate('sessions')
        

        const sortedSessions = sortSessions(user.sessions)

        response.json(sortedSessions)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter