const User = require('../models/user')
const Session = require('../models/session')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')

describe('when there is initially one user at db', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User(
            {
                "username": "testeren",
                "name": "testvard",
                "passwordHash": "sekret",
                friends: [
                ],
                sessions: [
                ]
            })
        await user.save()
    })

    test('creation succeeds with a fresh user', async () => {

        const user = new User(
            {
                "username": "joey",
                "name": "Joseph Tribiani",
                "passwordHash": "sekret",
                friends: [
                ],
                sessions: [
                ]
            }
        )
        await user.save()

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(2)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(user.username)
    })


    test('sessioncreation works', async () => {
        await Session.deleteMany({})
        const session = new Session(
            {
                dateTime: new Date(),
                location: "hangaren",
                creator: "5d7b94e9d7a1dc14cd5aaffc",
                participants: [],
                info: ""
            })
        await session.save()

        const sessionsAtEnd = await helper.sessionsInDb()
        expect(sessionsAtEnd.length).toBe(1)

        const sessionDates = sessionsAtEnd.map(sess => sess.dateTime)
        expect(sessionDates).toContainEqual(session.dateTime)
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})

