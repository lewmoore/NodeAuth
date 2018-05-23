let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')

let userSchema = mongoose.Schema({
  local : {
    email: String,
    password: String
  },

  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  }
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mogoose.model('User', userSchema)