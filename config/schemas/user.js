const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let userSchema = mongoose.Schema({
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// Uso `function()` ya que `() =>` no deja usar `this`
userSchema.methods.changePassword = function(password){
  const hash = require('../../utils/hash.js')

  this.password = hash.createHash(password)

  return;
}

userSchema.methods.comparePasswords = function(password){
  const hash = require('../../utils/hash.js')

  return hash.comparePasswords(password, this.password)
}

userSchema.query.byUser = function(user){
  return this.findOne({user: user})
}

userSchema.query.byEmail = function(email){
  return this.findOne({email: email})
}

module.exports = mongoose.model('User', userSchema)