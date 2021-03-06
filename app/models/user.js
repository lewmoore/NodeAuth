let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs')
let Schema = mongoose.Schema;

let UserSchema = new Schema ({
    email: String,
    password: String
})

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
