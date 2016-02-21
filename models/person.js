// db is mongoose
var db = require('../config/db')

var schema = new db.Schema(
  {
    username: {type: String, required: true, unique: true},
    //password:    {type: String, required: true, select: false, min: 8},
    unavailable: {type: Array, required: true, default: [] },
    workingDays: {type: Array, default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
  },
  { collection: 'people' }
)

var Person = db.model('Person', schema)

module.exports = Person