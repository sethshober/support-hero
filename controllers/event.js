// get an event
var Event = require('../models/event')
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


// create event
router.post('/event', function(req, res, next) {
  console.log(req.body.event)
  var event = Event(req.body.event)
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
    //res.sendStatus(201)
  })
})


// update an event


// db.events.update(
//    { month: "February" },
//    {
//       $set: {month: "february"}
//    },
//    { upsert: true }
// )


// db.events.insert({
//   year: '2016',
//   month: 'february',
//   day: '16',
//   title: 'Zoe',
//   start: '2016-02-16',
//   unavailable: []
// })


// default data test
// router.get('/events', function(req, res) {
//     var data = [
//         {
//           title: 'All Day Event',
//           start: '2014-11-01',
//           editable: true,
//           hello: 'hello'
//         },
//         {
//           title: 'Long Event',
//           start: '2014-11-07',
//           end: '2014-11-10'
//         },
//         {
//           id: 999,
//           title: 'Repeating Event',
//           start: '2014-11-09T16:00:00'
//         },
//         {
//           id: 999,
//           title: 'Repeating Event',
//           start: '2014-11-16T16:00:00'
//         },
//         {
//           title: 'Conference',
//           start: '2014-11-11',
//           end: '2014-11-13'
//         },
//         {
//           title: 'Meeting',
//           start: '2014-11-12T10:30:00',
//           end: '2014-11-12T12:30:00'
//         },
//         {
//           title: 'Lunch',
//           start: '2014-11-12T12:00:00'
//         },
//         {
//           title: 'Meeting',
//           start: '2014-11-12T14:30:00'
//         },
//         {
//           title: 'Happy Hour',
//           start: '2014-11-12T17:30:00'
//         },
//         {
//           title: 'Dinner',
//           start: '2014-11-12T20:00:00'
//         },
//         {
//           title: 'Birthday Party',
//           start: '2014-11-13T07:00:00'
//         },
//         {
//           title: 'Click for Google',
//           url: 'http://google.com/',
//           start: '2014-11-28'
//         }
//       ]
//     res.json(data)
// })


module.exports = router