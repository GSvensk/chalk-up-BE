const User = require('../models/user')
const app = require('../app')


describe('when there is initially one user at db', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User(
            {
                "username": "testeren",
                "name": "testvard",
                "passwordHash": "sekret"
            }
        )
        await user.save()
    })
})

