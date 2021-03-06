const User = require('../models/user')
const Session = require('../models/session')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const config = require('../utils/config')

describe('when there is initially one user at db', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User(
            {
                "username": config.TEST_USERNAME,
                "name": "testvard",
                "passwordHash": config.TEST_PASSWORD,
                friends: [
                ],
                sessions: [
                ]
            })
        await user.save()
    })

    test('creation succeeds with a fresh user', async () => {

        const usersAtStart = await helper.usersInDb()

        const user = new User(
            {
                "username": "joey",
                "name": "Joseph Tribiani",
                "passwordHash": config.TEST_PASSWORD,
                friends: [
                ],
                sessions: [
                ]
            }
        )
        await user.save()

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(user.username)
    })


    test('sessioncreation works', async () => {
        await Session.deleteMany({})
        const session = new Session(
            {
                dateTime: new Date(),
                location: "hangaren",
                creator: "user_test_id",
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

