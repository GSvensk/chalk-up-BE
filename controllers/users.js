const usersRouter = require('express').Router()
const User = require('./../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User
            .find({})
            .select({ "username": 1, "name": 1, "friends": 1, "sessions": 1})

        response.json(users.map(user => user.toJSON()))
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {

    const body = request.body

    try {
        const user = new User({
            "username": body.username,
            "name": body.name,
            "passwordHash": body.passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter