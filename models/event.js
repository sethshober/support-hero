// db is mongoose
var db = require('../config/db')

var schema = new db.Schema(
  {
    year:        {type: String},
    month:       {type: String},
    day:         {type: String},
    title:       {type: String},
    start:       {type: String},
    end:         {type: String},
    unavailable: {type: Array, default: []}
  },
  { collection: 'events' }
)

var Event = db.model('Event', schema)

module.exports = Event