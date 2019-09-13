const User = require('./../models/user')
const Session = require('./../models/session')

const sessionsInDb = async () => {
    const sessions = await Session.find({})
    return sessions.map(session => session.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    usersInDb,
    sessionsInDb
}