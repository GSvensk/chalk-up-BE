require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

let TEST_USERNAME = process.env.TEST_USERNAME
let TEST_PASSWORD = process.env.TEST_PASSWORD

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  PORT,
  MONGODB_URI,
  TEST_USERNAME,
  TEST_PASSWORD
}