// create the app
var supportHero = angular.module('supportHero', ['ui.router', 'ui.calendar'])


// set up basic state machine
supportHero.config(function($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/')
    $stateProvider
      // home state and nested views
      .state('home', {
        url: '/',
        templateUrl: 'partials/partial-home.html'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'partials/partial-calendar.html',
        controller: function($scope, $http) {
          
          // TODO: add error handler

          // test get user
          // $http.get("http://localhost:3000/person/test")
          // .then(function(res){
          //   console.log(res.data)
          // })
          
          // test create user
          // $http.post("http://localhost:3000/person", {username: "Sandy Rivers", unavailable: []})
          // .then(function(res) {
          //   console.log(res.data)
          // })

          // test delete user
          // $http.delete("http://localhost:3000/person/test")
          // .then(function(res){
          //   console.log(res.data)
          // })

          // test update availability
          // $http.patch("http://localhost:3000/person/availability", {username: "test", unavailable: "2016-02-20"})
          // .then(function(res){
          //   console.log(res.data)
          // })


          // this is hacked / not the angular way
          $http.get("http://localhost:3000/events")
          .then(function(res) {
            $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              defaultDate: '2014-11-12',
              editable: true,
              eventLimit: true, // allow "more" link when too many events
              events: res.data
            })
          })
        } // end controller
      })
})

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