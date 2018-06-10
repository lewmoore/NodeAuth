let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfileSchema = new Schema ({
  firstname: String,
  lastname: String,
  job: String
})

module.exports = mongoose.model('Profile', ProfileSchema)
