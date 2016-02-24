var mongoose = require('mongoose')
var db = mongoose.connection
var uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds011278.mongolab.com:11278/support-hero'
var uriLocal = 'mongodb://localhost:27017/support-hero'

mongoose.connect(uri , function(){
  db.on('error', console.error.bind(console, 'connection error:')) 
  db.once('open', function(){
    console.log("Successfully connected to support-hero MongoDB!")
  })
})

module.exports = mongoose