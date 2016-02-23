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
  function renderCal() {
    $('#calendar').fullCalendar('rerenderEvents')
  }

  function colorUnavailableDays (events) {
    console.log(events)
    events[0].backgroundColor = 'lightblue'
    // console.log('color days')
    // console.log($scope.unavailable)
    // for(var i = 0; i < events.length; i++) {
    //   if ($scope.unavailable.indexOf(events[i].start[_i]) != -1) {
    //     console.log('day match')
    //     events[i].color = 'rgb(255, 192, 203)'
    //   }
    // }
    renderCal()
  }

  $http.get('/person/Sherry')
    .then(function(res) {
      $scope.user = res.data.username
      // TODO set on duty message
      $scope.workingDays = res.data.workingDays
      $scope.unavailable = res.data.unavailable
      return res.data
    })


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
          $(this).css('background-color', 'rgb(255, 192, 203)')
          $http.patch("/person/add-unavailability", {username: $scope.user, unavailable: date})
            .then(function(res){
            console.log(res.data)
            $scope.unavailable.push(date)
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

      eventClick: function(calEvent, jsEvent, view) {
        // alert('Event: ' + calEvent.title)
        // alert('View: ' + view.name)
        // change the border color just for fun
        $(this).css('border-color', 'red')
      },

      dayRender: function (date, cell) {
        console.log(cell)
        if ($scope.unavailable.indexOf(date) != -1) {
          cell.css("background-color", "pink")
        }
      }
    })
  }).then(function(){
    var events = $('#calendar').fullCalendar('clientEvents')
    colorUnavailableDays(events)
  })
}]);

// supportHero.controller('calendarCtrl', function($scope, $http) {
//     $http.get("http://localhost:3000/person")
//     .then(function(response) {
//         console.log(response.data)
//         //$scope.myWelcome = response.data;
//     });
// });

// TODO: move controller to separate folder
// supportHero.controller('calendarCtrl', function($scope) {
//     /* config object */
//     $scope.uiConfig = {
//       calendar:{
//         height: 450,
//         editable: true,
//         header:{
//           left: 'month basicWeek basicDay agendaWeek agendaDay',
//           center: 'title',
//           right: 'today prev,next'
//         },
//         dayClick: $scope.alertEventOnClick,
//         eventDrop: $scope.alertOnDrop,
//         eventResize: $scope.alertOnResize
//       }
//     }
// })