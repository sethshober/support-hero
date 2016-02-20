// create the app
var supportHero = angular.module('supportHero', ['ui.router', 'ui.calendar'])


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
        templateUrl: 'partials/partial-calendar.html'
      })
})

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
