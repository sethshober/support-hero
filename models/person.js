var db = require('../config/db');

var Person = db.model('Person',{
    username:    {type: String, required: true, unique: true},
    //password:    {type: String, required: true, select: false, min: 8},
    unavailable: {type: Array, required: true }
});

module.exports = Person