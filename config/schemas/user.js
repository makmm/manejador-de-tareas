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

  return
}

userSchema.methods.comparePasswords = function(password){
  const hash = require('../../utils/hash.js')

  return hash.comparePasswords(password, this.password)
}

userSchema.statics.isConflicting = async function(otherUser){
  const userConflict = await this.findOne({user: otherUser.user})
  const emailConflict = await this.findOne({email: otherUser.email})
  if(userConflict instanceof Object &&
    !userConflict.equals(otherUser))
    return "user"
  else if(emailConflict instanceof Object &&
    !emailConflict.equals(otherUser))
    return "email"
  else return false
}

userSchema.query.byUser = function(user){
  return this.findOne({user: user})
}

userSchema.query.byEmail = function(email){
  return this.findOne({email: email})
}

module.exports = mongoose.model('User', userSchema)
