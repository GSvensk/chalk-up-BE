const usersRouter = require('express').Router()
const User = require('./../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User
            .find({})
            .select({ "username": 1, "name": 1, "friends": 1})
            .populate('sessions', {"location": 1, "dateTime": 1})

        response.json(users.map(user => user.toJSON()))
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {

    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter