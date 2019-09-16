const supertest = require('supertest')
const app = require('../../app')
const config = require('../../utils/config')
const User = require('../../models/user')
const mongoose = require('mongoose')
const api = supertest(app)


const validSession = {
    dateTime: new Date(),
    location: "hangaren",
    creator: "test",
    participants: [],
    info: ""
}


test('when creating a session a user has to be authenticated', async () => {
    await api
        .post('/api/sessions')
        .send(validSession)
        .expect(401)
})


describe('when a logged in user creates a session', () => {

    let token = ""

    beforeAll(async () => {
        await User.deleteMany({})
        const credentials = {
            username: config.TEST_USERNAME,
            password: config.TEST_PASSWORD
        }

        await api
            .post('/api/users')
            .send({ username: config.TEST_USERNAME, password: config.TEST_PASSWORD, name: "test" })

        const res = await api
            .post('/api/login')
            .send(credentials)

        token = res.body.token
    })

    test('a valid session can be successfully created', async () => {

        console.log(validSession)
        await api
            .post('/api/sessions')
            .set('Authorization', `bearer ${token}`)
            .send(validSession)
            .expect(200)
    })

    test('dateTime has to be supplied', async () => {

        const invalidSession = validSession
        delete invalidSession.dateTime

        await api
            .post('/api/sessions')
            .set('Authorization', `bearer ${token}`)
            .send(invalidSession)
            .expect(400)
    })

    test('location has to be supplied', async () => {

        const invalidSession = validSession
        delete invalidSession.location

        await api
            .post('/api/sessions')
            .set('Authorization', `bearer ${token}`)
            .send(invalidSession)
            .expect(400)
    })
})



afterAll(() => {
    mongoose.connection.close()
})