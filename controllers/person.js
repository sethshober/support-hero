var Person = require('../models/person')
  , router = require('express').Router()

// get all the people
router.get('/people', function(req, res, next) {
  Person.find()
    .exec(function(err, people) {
      if (err) return next(err)
      res.json(people)
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

// create person
router.post('/person', function(req, res, next) {
  console.log(req.body.username)
  var person = new Person({username: req.body.username})
  console.log(person)
  person.save(function(err) {
    if (err) console.log(err); return next(err)
    res.sendStatus(201)
  })
})


// update person
router.put('/person', function(req, res, next){
  console.log("Updating User " + req.body.username)
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
router.patch('/person/add-unavailability', function(req, res, next){
  console.log("Updating User availability " + req.body.username)
  Person.findOneAndUpdate(
    {username: req.body.username},
    { $addToSet: { unavailable: req.body.unavailable } },
    function(person) { res.json(person) }
  )
})


// remove availability
router.patch('/person/remove-unavailability', function(req, res, next){
  console.log("Updating User availability " + req.body.username)
  Person.findOneAndUpdate(
    {username: req.body.username},
    { $pull: { unavailable: { $in: [ req.body.unavailable ] } } },
    function(person) { res.json(person) }
  )
})


// delete person
router.delete('/person/:username', function(req, res, next){
  console.log("Deleting User " + req.params.username)
  Person.remove({username: req.params.username}, function(res, err) {
    if (err) return next(err)
    console.log('successful delete')
    res.sendStatus(201)
  })
})

module.exports = router