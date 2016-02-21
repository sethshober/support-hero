var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('./public/index.html')
})

router.get('/person', function(req, res) {
    //var data = {name:"test"}
    var data = [
        {
          title: 'All Day Event',
          start: '2014-11-01'
        },
        {
          title: 'Long Event',
          start: '2014-11-07',
          end: '2014-11-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2014-11-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2014-11-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2014-11-11',
          end: '2014-11-13'
        },
        {
          title: 'Meeting',
          start: '2014-11-12T10:30:00',
          end: '2014-11-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2014-11-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2014-11-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2014-11-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2014-11-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2014-11-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2014-11-28'
        }
      ]
    res.json(data)
})

module.exports = router
