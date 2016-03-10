'use strict'

// create the app
var supportHero = angular.module('supportHero', ['ui.router'])

// set up basic state machine
supportHero.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/calendar')
  $stateProvider
    .state('calendar', {
      url: '/calendar',
      templateUrl: 'partials/partial-calendar.html',
      controller: 'mainCtrl'
    })
})