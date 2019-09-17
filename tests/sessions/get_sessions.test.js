const supertest = require('supertest')
const app = require('../../app')
const Session = require('../../models/session')
const User = require('../../models/user')
const helper = require('../test_helper')
const config = require('../../utils/config')
const mongoose = require('mongoose')
const api = supertest(app)


test('sessions are returned as json', async () => {
    await api
        .get('/api/sessions')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe('when there is initially some sessions saved and a user saved', () => {

    let token = ""
    let id = ""

    const createSession = async (token, session) => {
        api
            .post('/api/sessions')
            .set('Authorization', `bearer ${token}`)
            .send(session)
    }

    beforeAll(async () => {
        await User.deleteMany({})
        const credentials = {
            username: config.TEST_USERNAME,
            password: config.TEST_PASSWORD
        }

        const res = await api
            .post('/api/users')
            .send({ username: config.TEST_USERNAME, password: config.TEST_PASSWORD, name: "test" })

        id = res.body.id
        console.log(id)

        const response = await api
            .post('/api/login')
            .send(credentials)

        token = response.body.token

        await Session.deleteMany({})
        for (let session of helper.initialSessions) {
            await api
                .post('/api/sessions')
                .set('Authorization', `bearer ${token}`)
                .send(session)
        }
    })


    test('the correct amount of sessions is returned', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body.length).toBe(helper.initialSessions.length)
    })

    test('the unique identifier property of the session posts is named id', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body[0].id).toBeDefined()
    })

    test('the unique identifier property of the session posts is not named _id', async () => {
        const res = await api.get('/api/sessions')
        expect(res.body[0]._id).not.toBeDefined()
    })

    test('the users sessions return sorted', async () => {
        const res = await api
            .get(`/api/user/${id}/sessions`)
            .set('Authorization', `bearer ${token}`)

        const dateTimes = res.body.map(sess => Date(sess.dateTime))
        const sortedDateTimes = helper.sortedSessions.map(sess => Date(sess.dateTime))
        expect(res.body.length).toBe(helper.sortedSessions.length)
        expect(dateTimes).toEqual(sortedDateTimes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})