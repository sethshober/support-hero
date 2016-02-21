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
          $http.get("http://localhost:3000/person")
          .then(function(response) {
            console.log(response.data)
            //$scope.myWelcome = response.data;

            $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              defaultDate: '2014-11-12',
              editable: true,
              eventLimit: true, // allow "more" link when too many events
              events: response.data
            });

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