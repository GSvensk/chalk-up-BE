
const userRouter = require('express').Router()
const User = require('./../models/user')


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

module.exports = userRouter