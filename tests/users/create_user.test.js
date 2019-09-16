const User = require('../../models/user')
const helper = require('../test_helper')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const mongoose = require('mongoose')

test('a user can be created', async () => {
    await User.deleteMany({})
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        "username": "testeren",
        "name": "testvard",
        "passwordHash": "sekret"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

describe('when there is initially one user created', () => {

    let newUserId = ""
    let newUser = null

    beforeEach(async () => {
        await User.deleteMany({})
        newUser = {
            username: "testeren",
            name: "testvard",
            passwordHash: "sekret"
        }

        const res = await api
            .post('/api/users')
            .send(newUser)

        newUserId = res.body.id
    })

    test('that user gets returned as json', async () => {
        await api
            .get(`/api/user/${newUserId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the user is returned correctly', async () => {
        const expectedUser =
        {
            id: newUserId,
            username: "testeren",
            name: "testvard",   
            friends: [],
            sessions: []
        }
        const res = await api.get(`/api/user/${newUserId}`)
        expect(res.body).toMatchObject(expectedUser)
    })


    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testeren',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})