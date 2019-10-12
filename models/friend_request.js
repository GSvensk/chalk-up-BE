const mongoose = require('mongoose')

const friendRequestSchema = mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        enum: ["Pending", "Accepted", "Declined"]
    }
})

friendRequestSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('FriendRequest', friendRequestSchema)