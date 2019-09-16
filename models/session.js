const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
  dateTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  info: {
    type: String,
    maxlength: 300
  }
})

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Session', sessionSchema)
