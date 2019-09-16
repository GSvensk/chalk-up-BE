const supertest = require('supertest')
const app = require('../../app')
const Session = require('../../models/session')
const mongoose = require('mongoose')
const api = supertest(app)


const initialSessions = [
        {
            dateTime: new Date(),
            location: "hangaren",
            creator: "test_user",
            participants: [],
            info: ""
        },
        {
            dateTime: new Date(),
            location: "akalla",
            creator: "test_user",
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