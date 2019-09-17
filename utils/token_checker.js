const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const extractToken = (request) => {

    let token = null
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }

    return token
}

const tokenChecker = (request, response, next) => {

    const token = extractToken(request)
    let tokenValid = token !== null

    const decodedToken = jwt.verify(token, config.TOKEN_SECRET)

    if (tokenValid && decodedToken.id) {
        request["userId"] = decodedToken.id
    } else {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    next()
}



module.exports = tokenChecker