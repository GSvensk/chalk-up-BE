const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')


test('creation succeeds with a fresh user', async () => {
    await User.deleteMany({})
    const user = new User({ username: 'test', name: 'test rootson' })
    await user.save()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(user.username)
})

afterAll(() => {
    mongoose.connection.close()
})