// get an event
var Event  = require('../models/event')
  , router = require('express').Router()


// get all the events
router.get('/events', function(req, res, next) {
  Event.find()
    .exec(function(err, events) {
      if (err) return next(err)
      res.json(events)
    })
})


// get event months
router.get('/events/:month', function(req, res, next) {
  Event.find({month: req.params.month}, function(err, events){
    if (err) return next(err)
    console.log(events)
    res.json(events)
  })
})


// get event day
router.get('/event/:date', function(req, res, next) {
  Event.find({start: req.params.date}, function(err, event){
    if (err) return next(err)
    console.log(event)
    res.json(event)
  })
})


// create event
router.post('/event', function(req, res, next) {
  console.log(req.body.event)
  var event = new Event(req.body.event)
  event.save(function(err, event){
    if (err) return next(err)
    console.log('saved event')
    res.json(event)
  })
})


// delete event
router.delete('/event/:username', function(req, res, next){
  console.log("Deleting User " + req.params.username)
  Person.remove({username: req.params.username}, function(res, err) {
    if (err) return next(err)
    console.log('successful delete')
    res.sendStatus(201)
  })
})


// update availability
router.patch('/event/add-unavailability', function(req, res, next){
  var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
  if ( !r.test(req.body.start) ) {
    console.log('bad date format')
    res.status(400).send("bad date format")
    return
  }
  console.log("Updating event availability")
  Event.findOneAndUpdate(
    {start: req.body.start},
    { $addToSet: { unavailable: req.body.username } },
    function(event) { res.json(event) }
  )
})


// remove availability
router.patch('/event/remove-unavailability', function(req, res, next){
  console.log("Updating event availability")
  Event.findOneAndUpdate(
    {start: req.body.start},
    { $pull: { unavailable: { $in: [ req.body.username ] } } },
    function(event) { res.json(event) }
  )
})


// update event title
router.patch('/event/update/title', function(req, res, next){
  console.log("updating event title")
  Event.findOneAndUpdate(
    {start: req.body.start},
    { $set: { title: req.body.title } },
    function(event) { res.json(event) }
  )
})


module.exports = router