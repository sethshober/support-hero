// create the app
var supportHero = angular.module('supportHero', ['ui.router'])


// set up basic state machine
supportHero.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
    // home state and nested views
    .state('home', {
      url: '/',
      templateUrl: 'partials/partial-home.html'
    })
    .state('calendar', {
      url: '/calendar',
      templateUrl: 'partials/partial-calendar.html',
      controller: 'mainCtrl'
    })
})


supportHero.controller('mainCtrl', ["$scope", "$http", function($scope, $http){
  
  $scope.heroDate

  function renderCal() {
    $('#calendar').fullCalendar('rerenderEvents')
  }

  function colorOnDutyDays(events) {
    console.log('color days')
    for(var i = 0; i < events.length; i++) {
      if (events[i].title === $scope.user) {
        console.log('day match')
        events[i].color = '#98FB98'
      }
    }
  }

  function listOnDutyDays(events) {
    $scope.onDutyDays = []
    for(var i = 0; i < events.length; i++) {
      if (events[i].title === $scope.user) {
        $scope.onDutyDays.push(events[i].start.format('YYYY-MM-DD'))
      }
    }
  }

  $http.get('/person/Sherry')
    .then(function(res) {
      $scope.user = res.data.username
      // TODO set on duty message
      $scope.workingDays = res.data.workingDays
      $scope.unavailable = res.data.unavailable
    })



  // find an available hero given a date
  $scope.generateHero = function(date) {
    console.log('generating hero')
    console.log(date)
    // date placeholder to test
    // var date = '2016-02-10'
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
    if (!r.test(date)) return
    else {
      $http.get('/people')
        .then(function(res) {
          var people = res.data
            , notFound = true
            , hero
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
          // create calendar event
          $('#calendar').fullCalendar('renderEvent',
            {
              title: $scope.generatedHero,
              start: date
            })
          // TODO
          // post to API
          // check if current event via date
          // remove/replace
        })
    }
  }


  // continuation of above
  // find an available hero given a date
  // FIXME: will loop infinitely if every person has a day unavailable
  // $scope.generateHero = function(date) {

  //   console.log('generating hero for ' + date)

  //   // create calendar event
  //   function addHeroToCalendar(hero) {
  //     console.log($scope.generatedHero)
  //     $('#calendar').fullCalendar('renderEvent',
  //       {
  //         title: hero,
  //         start: date
  //       })
  //   }

  //   // remove current hero on duty
  //   function updateEvent() {
  //     $http.patch('/event/update/title', {start: date, title: $scope.generatedHero})
  //       .then(function(res) {
  //         console.log(res.data)
  //       })
  //   }

  //   // post event to API
  //   function postEvent() {
  //     var month
  //       , monthNames
  //       , postEvent
      
  //     monthNames = ["january", "february", "march", "april", "may", "june",
  //     "july", "august", "september", "october", "november", "december"
  //     ]

  //     if(date.slice(5,6) === 0) month = monthNames[date.slice(6,7) - 1]
  //     else month = date.slice(5,7)
      
  //     postEvent = {
  //       year: date.slice(0,4),
  //       month: month,
  //       day: date.slice(-2),
  //       title: $scope.generatedHero,
  //       start: date
  //     }

  //     $http.post('/event', {event: postEvent})
  //       .then(function(res) {
  //         console.log(res)
  //       })
  //   }

  //   function findHero() {
  //     $http.get('/people')
  //     .then(function(res) {
  //       var people = res.data
  //         , notFound = true
  //         , hero
  //       // add stopgap for if nobody is available
  //       while (notFound) {
  //         var person = Math.floor(Math.random() * people.length)
  //         console.log(person)
  //         if (people[person].unavailable.indexOf(date) === -1) { // person IS available
  //           notFound = false
  //           hero = people[person].username
  //           $scope.generatedHero = hero
  //           console.log(people[person].username)
  //         } else console.log('no match going again')
  //       }
  //       return hero
  //     })
  //   }

  //   // date placeholder to test
  //   // var date = '2016-02-10'
  //   var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
  //   if (!r.test(date)) { 
  //     console.log('not valid date')
  //     return
  //   } else {
  //     // create new hero duty or swap if already one
  //     // only accounts for one event per day (grabs first one)
  //     $http.get('/event/' + date)
  //       .then(function(res) {
  //         if(res.data.length == 0) { // no event/hero assigned
  //           addHeroToCalendar(findHero())
  //           postEvent()
  //         } else { // swap duty
  //           addHeroToCalendar($scope.user)
  //           updateEvent()
  //         }
  //       })
  //     }
  // } // end generateHero



  // TODO: add check for own day, and generate new hero
  $scope.addUnavailability = function(day) {
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
    if (r.test(day)) {
      $http.patch("/person/add-unavailability", {username: $scope.user, unavailable: day})
        .then(function(res){
        console.log(res.data)
        $scope.unavailable.push(day)
      })
      $http.patch("/event/add-unavailability", {username: $scope.user, start: day})
        .then(function(res){
        console.log(res.data)
      })
    } else console.log('not valid date')
  }


  $scope.removeUnavailability = function(evt) {
    // DON'T DO THIS IN REAL LIFE
    var date = evt.path[1].lastChild.data.trim()
    
    $http.patch("/person/remove-unavailability", {username: $scope.user, unavailable: date})
      .then(function(res){
      console.log(res.data)
    })
    $http.patch("/event/remove-unavailability", {username: $scope.user, start: date})
      .then(function(res){
      console.log(res.data)
    })
  }


  // remove list item (unavailable)
  $scope.remove = function(array, index){
    console.log(index)
    console.log(array)
    array.splice(index, 1)
    console.log(array)
  }

  // TODO: add error handler


  // test get user
  // $http.get("/person/test")
  // .then(function(res){
  //   console.log(res.data)
  // })
  
  // test get people
  // $http.get("/people")
  // .then(function(res){
  //   console.log(res.data)
  // })

  // test create user
  // $http.post("/person", {"username": "Jim Carrey"})
  // .then(function(res) {
  //   console.log(res.data)
  // })

  // test delete user
  // $http.delete("http://localhost:3000/person/test")
  // .then(function(res){
  //   console.log(res.data)
  // })

  // test update availability
  // $http.patch("http://localhost:3000/person/remove-availability", {username: "test", unavailable: "2016-02-21"})
  // .then(function(res){
  //   console.log(res.data)
  // })

  // test remove availability
  // $http.patch("http://localhost:3000/person/add-availability", {username: "test", unavailable: "2016-02-22"})
  // .then(function(res){
  //   console.log(res.data)
  // })

  // test get events
  // $http.get('/events')
  // .then(function(res) {
  //   console.log(res.data)
  // })


  $

  // this is hacked / not the angular way
  $http.get("/events")
  .then(function(res) {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: res.data,
    
      // can use to toggle available
      dayClick: function(date, view) {
        // alert('Clicked on: ' + date.format())
        // alert('Current view: ' + view.name)
        // mark day available
        if ($(this).css('background-color') === 'rgba(0, 0, 0, 0)') {
          $(this).css('background-color', '#FFE4E1')
          $http.patch("/person/add-unavailability", {username: $scope.user, unavailable: date})
            .then(function(res){
            console.log(res.data)
            console.log(date)
            $scope.unavailable.push(date.format('YYYY-MM-DD'))
            console.log($scope.unavailable)
          })
          $http.patch("/event/add-unavailability", {username: $scope.user, start: date})
            .then(function(res){
            console.log(res.data)
          })
        // mark day unavailable    
        } else {
          $(this).css('background-color', 'rgba(0, 0, 0, 0)')
          $http.patch("/person/remove-unavailability", {username: $scope.user, unavailable: date})
            .then(function(res){
            console.log(res.data)
            $scope.unavailable.splice(date, 1)
            console.log($scope.unavailable)
          })
          $http.patch("/event/remove-unavailability", {username: $scope.user, start: date})
            .then(function(res){
            console.log(res.data)
          })
        }
      },

      // do something when clicking an event
      // like a small pop up maybe?
      eventClick: function(calEvent, jsEvent, view) {
        // alert('Event: ' + calEvent.title)
        // alert('View: ' + view.name)
        // change the border color just for fun
        // $(this).css('border-color', 'red')
      },

      dayRender: function (date, cell) {
        console.log(cell)
        date = moment(date).format('YYYY-MM-DD')
        //console.log('day render ' + moment(new Date(date)).format('YYYY-MM-DD'))
        if ($scope.unavailable.indexOf(date) != -1) {
          cell.css("background-color", "#FFE4E1")
        }
      }
    })
  })
  .then(function(){
    var events = $('#calendar').fullCalendar('clientEvents')
    colorOnDutyDays(events)
    listOnDutyDays(events)
    renderCal()
    // set current hero
    var d = $('#calendar').fullCalendar('getDate').format('YYYY-MM-DD')
    $http.get('/event/' + d)
      .then(function(res) {
        $scope.currentHero = res.data[0].title
      })
  })
}])