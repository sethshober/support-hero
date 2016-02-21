// get a person
var Person = require('../models/person')
  , router = require('express').Router()


// create new user
router.post('/person', function(req, res, next) {
  var person = new Person({
    username: req.body.username,
    unavailable: []
  })
  person.save(function(err) {
    if(err) return next(err)
    console.log('Person successfully created.')
    res.sendStatus(201)
  })
})


// find person
router.get('/person/:username', function(req, res, next) {
  Person.findOne({username: req.params.username}, function(err, person){
    if(err) return next(err)
      console.log(person)
      res.json(person)
  })
})

// router.post('/person/:name'), function(req, res, next){
//   var person = new Person({username: req.body.name, unavailable: []})
//   bcrypt.hash(req.body.password, 10, function(err, hash){
//     if(err) return next(err)
//     user.password = hash
//     user.save(function(err) {
//       if(err) return next(err) {
//         res.sendStatus(201)
//       }
//     })
//   })
// }

