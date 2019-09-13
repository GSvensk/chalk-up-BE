const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
  dateTime: {
    type: Date,
    required: true
  },
  location: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  info: String
})

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Session', sessionSchema)
