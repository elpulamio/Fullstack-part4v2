const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.pre('save', function(next) {
  if (this.likes === null) {
    this.likes = 0
  }
  next()
})

blogSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

blogSchema.set('toObject', {
  virtuals: true
})

blogSchema.set('toJSON', {
  virtuals: true
})

blogSchema.set('toBject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)