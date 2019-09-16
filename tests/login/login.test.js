const User = require('../../models/user')
const supertest = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const api = supertest(app)
const config = require('../../utils/config')

describe('when there is initially one user created', () => {

    let newUserId = ""
    let newUser = null

    beforeEach(async () => {
        await User.deleteMany({})
        newUser = {
            username: config.TEST_USERNAME,
            name: "testvard",
            password: config.TEST_PASSWORD
        }

        const res = await api
            .post('/api/users')
            .send(newUser)

        newUserId = res.body.id
    })

    test('its possible to login as that user', async () => {

        const credentials = {
            username: config.TEST_USERNAME,
            password: config.TEST_PASSWORD
        }

        await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
    })

    test('its impossible to login as another user', async () => {

        const credentials = {
            username: "root",
            password: config.TEST_PASSWORD
        }

        await api
            .post('/api/login')
            .send(credentials)
            .expect(401)
    })
})


afterAll(() => {
    mongoose.connection.close()
})