const friendRequestsRouter = require('express').Router()
const FriendRequest = require('../models/friend_request')
const User = require('../models/user')
const tokenChecker = require('../utils/token_checker')

friendRequestsRouter.use(tokenChecker)

friendRequestsRouter.post('/', async (request, response, next) => {

    const body = request.body

    try {
        //request.userId comes from tokenChecker middleware        
        const requester = await User.findById(request.userId)
        const recipient = await User.findById(body.recipient)
        
        const friendRequest = new FriendRequest({
            requester: requester,
            recipient: recipient,
            status: "Pending"
        })

        const savedFriendRequest = await friendRequest.save()
        response.json(savedFriendRequest.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = friendRequestsRouter