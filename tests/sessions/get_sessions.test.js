const supertest = require('supertest')
const app = require('../../app')
const Session = require('../../models/session')
const User = require('../../models/user')
const mongoose = require('mongoose')
const api = supertest(app)


const initialSessions = [
        {
            dateTime: new Date(),
            location: "hangaren",
            creator: "5d7b94e9d7a1dc14cd5aaffc",
            participants: [],
            info: ""
        },
        {
            dateTime: new Date(),
            location: "akalla",
            creator: "5d7b94e9d7a1dc14cd5aaffc",
            participants: [],
            info: ""
        }
]

beforeEach(async () => {
    await Session.deleteMany({})

    const sessionObjects = initialSessions
        .map(session => new Session(session))
    const promises = sessionObjects.map(session => session.save())
    await Promise.all(promises)


    await User.deleteMany({})
    const user = new User({ username: 'session_test', name: 'test sesson', passwordHash: 'lösen' })
    await user.save()
})

describe('when there is initially some sessions saved', () => {
    test('sessions are returned as json', async () => {
        await api
            .get('/api/sessions')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the correct amount of sessions is returned', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body.length).toBe(initialSessions.length)
    })

    test('the unique identifier property of the session posts is named id', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body[0].id).toBeDefined()
    })

    test('the unique identifier property of the session posts is not named _id', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body[0]._id).not.toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})