// This is the controller for the app.
// It's mostly calendar stuff.
// Unfortunately it's a monolith, still.

supportHero.controller('mainCtrl', ['$scope',  
                                    'peopleSvc', 
                                    'eventSvc', 
                                    'availabilitySvc', 
                                    function ($scope, 
                                              peopleSvc, 
                                              eventSvc, 
                                              availabilitySvc) {

  // TODO: add error handlers


  // update calendar events
  function renderCal() {
    $('#calendar').fullCalendar('rerenderEvents')
  }

  // change event color for days user is on duty
  function colorOnDutyDays(events) {
    for(let evt of events) {
      if (evt.title === $scope.user) {
        evt.color = '#98FB98'
      }
    }
  }

  // list on duty days in sidebar
  function listOnDutyDays(events) {
    $scope.onDutyDays = []
    for(let evt of events) {
      if (evt.title === $scope.user) {
        $scope.onDutyDays.push(evt.start.format('YYYY-MM-DD'))
      }
    }
  }


  // find an available hero given a date
  $scope.generateHero = function(date) {
    console.log('generating hero')
    console.log(date)
    // date placeholder to test
    // var date = '2016-02-10'
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
    if (!r.test(date)) return
    else {
      // get all the people
      peopleSvc.getPeople()
        .then(function(people) {
          var notFound = true
            , hero
          // pick a random one
          while (notFound) {
            var person = Math.floor(Math.random() * people.length)
            console.log(person)
            if (people[person].unavailable.indexOf(date) === -1) { // person IS available
              notFound = false
              hero = people[person].username
              $scope.generatedHero = people[person].username
              console.log(people[person].username)
            } else console.log('no match going again')
          }
      }).then(function() {
          // create UI calendar event
          $('#calendar').fullCalendar('renderEvent',
            {
              title: $scope.generatedHero,
              start: date
            })
          // check for event
          eventSvc.getEvent(date)
          .then(function(evt){
            var e = { event: {title: $scope.generatedHero, start: date }}
            if (!evt[0]) { // no events for day
              // create the event
              eventSvc.createEvent(e)
            } else {
              // TODO: add ask for swap
              eventSvc.removeEvent(date)
              eventSvc.createEvent(e)
              // TODO: remove event from UI
            }
          })
        })
    }
  }


  // TODO: add check for own day, and generate new hero
  $scope.addUnavailability = function(day) {
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
    if (r.test(day)) {
      availabilitySvc.addPersonUnavailability({username: $scope.user, unavailable: day})
        .then(function(data){
        console.log(data)
        $scope.unavailable.push(day)
      })
      availabilitySvc.addEventUnavailability({username: $scope.user, start: day})
        .then(function(data){
        console.log(data)
      })
    } else console.log('not valid date')
  }


  $scope.removeUnavailability = function(evt) {
    // DON'T DO THIS IN REAL LIFE
    var date = evt.path[1].lastChild.data.trim()
    
    availabilitySvc.removePersonUnavailability({username: $scope.user, unavailable: date})
      .then(function(data){
      console.log(data)
    })
    availabilitySvc.removeEventUnavailability({username: $scope.user, start: date})
      .then(function(data){
      console.log(data)
    })
  }


  // remove list item
  $scope.remove = function(array, index){
    array.splice(index, 1)
  }


  // get our default user Sherry
  // this should probably be a service
  // and in reality user session token would be passed in header
  peopleSvc.getPerson('Sherry')
    .then(function(person) {
      $scope.user = person.username
      $scope.workingDays = person.workingDays
      $scope.unavailable = person.unavailable
    })


  // we should be more efficient in grabbing events
  // would be best to grab per view ex. month
  eventSvc.getEvents()
  .then(function(events) {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events,
    
      // toggle availability
      dayClick: function(date, view) {
        // alert('Clicked on: ' + date.format())
        // alert('Current view: ' + view.name)
        
        // mark day available
        if ($(this).css('background-color') === 'rgba(0, 0, 0, 0)') { // normal
          $(this).css('background-color', '#FFE4E1') // make Misty Rose
          availabilitySvc.addPersonUnavailability({username: $scope.user, unavailable: date})
            .then(function(data){
            $scope.unavailable.push(date.format('YYYY-MM-DD'))
          })
          availabilitySvc.addEventUnavailability({username: $scope.user, start: date})
            .then(function(data){
            console.log(data)
          })
        // mark day unavailable    
        } else {
          $(this).css('background-color', 'rgba(0, 0, 0, 0)')
          availabilitySvc.removePersonUnavailability({username: $scope.user, unavailable: date})
            .then(function(data){
            $scope.unavailable.splice(date, 1)
          })
          availabilitySvc.removeEventUnavailability({username: $scope.user, start: date})
            .then(function(data){
            console.log(data)
          })
        }
      },

      // do something when clicking an event
      // like a small pop up maybe?
      eventClick: function(calEvent, jsEvent, view) {
      },

      // do something on each day
      // in this case color unavailable days
      // there is an inconsistent bug here on load
      dayRender: function (date, cell) {
        date = moment(date).format('YYYY-MM-DD')
        if ($scope.unavailable.indexOf(date) != -1) {
          cell.css("background-color", "#FFE4E1")
        }
      }
    })
  })
  .then(function(){
    var events = $('#calendar').fullCalendar('clientEvents')
    var d = $('#calendar').fullCalendar('getDate').format('YYYY-MM-DD')
    colorOnDutyDays(events)
    listOnDutyDays(events)
    renderCal()
    eventSvc.getEvent(d)
      .then(function(evt) {
        // add current hero to message
        if (evt[0].title === $scope.user) $scope.currentHero = "You"
        else $scope.currentHero = evt[0].title
      })
  })

}])