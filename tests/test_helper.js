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

const initialSessions = [
    {
        dateTime: new Date('2019-09-20'),
        location: "malmö",
        creator: "5d7fa380cfcc10260c5cfc5b",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2020-01-01'),
        location: "hangaren",
        creator: "5d7fa380cfcc10260c5cfc5b",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2019-08-10'),
        location: "solna",
        creator: "5d7fa380cfcc10260c5cfc5b",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2019-10-01'),
        location: "akalla",
        creator: "5d7fa380cfcc10260c5cfc5b",
        participants: [],
        info: ""
    }
]

const sortedSessions = [
    {
        dateTime: new Date('2020-01-01'),
        location: "hangaren",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2019-10-01'),
        location: "akalla",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2019-09-20'),
        location: "malmö",
        participants: [],
        info: ""
    },
    {
        dateTime: new Date('2019-08-10'),
        location: "solna",
        participants: [],
        info: ""
    }
]

module.exports = {
    usersInDb,
    sessionsInDb,
    initialSessions,
    sortedSessions
}