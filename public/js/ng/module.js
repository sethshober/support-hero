'use strict'

/* 
 * Please note that to get this done in the timeline, 
 * with my minimal nG experience, I had to make some hacks.
 * Breaking this out into nested views, using directives and services, etc,
 * would be necessary in taking this forward.
 */

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