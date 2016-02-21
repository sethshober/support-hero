// get a person
var Person = require('../models/person')
  , router = require('express').Router()


// find person
router.get('/person/:username', function(req, res, next) {
  Person.findOne({username: req.params.username}, function(err, person){
    if(err) return next(err)
    console.log(person)
    res.json(person)
  })
})

// create person
router.post('/person', function(req, res, next) {
  console.log(req.body.username)
  var person = Person({username: req.body.username})
  person.save(function(res, err) {
    if (err) return next(err)
    console.log('saved' + req.body.username)
    res.sendStatus(201)
  })
})


// update person
router.put('/person', function(req, res, next){
  console.log("Updating User" + req.body.username)
  Person.findOneAndUpdate({username: req.body.username},
    {$set: 
      {
        username: req.body.username,
        unavailable: req.body.unavailable
      }
    },
    {upsert: true},
    function() {res.json(Person)}  
  )
})


// update availability
router.patch('/person/availability', function(req, res, next){
  console.log("Updating User availability" + req.body.username)
  Person.findOneAndUpdate(
    {username: req.body.username},
    { $push: { unavailable: req.body.unavailable } },
    function() { res.json(Person) }
  )
})


// delete person
router.delete('/person/:username', function(req, res, next){
  console.log("Deleting User" + req.params.username)
  Person.remove({username: req.params.username}, function(res, err) {
    if (err) return next(err)
    console.log('successful delete')
    res.sendStatus(201)
  })
})

module.exports = router