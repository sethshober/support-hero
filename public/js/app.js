'use strict';

// create the app

var supportHero = angular.module('supportHero', ['ui.router']);

// set up basic state machine
supportHero.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/calendar');
  $stateProvider.state('calendar', {
    url: '/calendar',
    templateUrl: 'partials/partial-calendar.html',
    controller: 'mainCtrl'
  });
});
'use strict';

// This is the controller for the app.
// It's mostly calendar stuff.
// Unfortunately it's a monolith, still.

supportHero.controller('mainCtrl', ['$scope', 'peopleSvc', 'eventSvc', 'availabilitySvc', function ($scope, peopleSvc, eventSvc, availabilitySvc) {

  // TODO: add error handlers

  // update calendar events
  function renderCal() {
    $('#calendar').fullCalendar('rerenderEvents');
  }

  // change event color for days user is on duty
  function colorOnDutyDays(events) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var evt = _step.value;

        if (evt.title === $scope.user) {
          evt.color = '#98FB98';
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  // list on duty days in sidebar
  function listOnDutyDays(events) {
    $scope.onDutyDays = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var evt = _step2.value;

        if (evt.title === $scope.user) {
          $scope.onDutyDays.push(evt.start.format('YYYY-MM-DD'));
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  // get our default user Sherry
  // this should probably be a service
  // and in reality user session token would be passed in header
  peopleSvc.getPerson('Sherry').then(function (person) {
    $scope.user = person.username;
    // TODO set on duty message
    $scope.workingDays = person.workingDays;
    $scope.unavailable = person.unavailable;
  });

  // find an available hero given a date
  $scope.generateHero = function (date) {
    console.log('generating hero');
    console.log(date);
    // date placeholder to test
    // var date = '2016-02-10'
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
    if (!r.test(date)) return;else {
      // get all the people
      peopleSvc.getPeople().then(function (people) {
        var notFound = true,
            hero;
        // pick a random one
        while (notFound) {
          var person = Math.floor(Math.random() * people.length);
          console.log(person);
          if (people[person].unavailable.indexOf(date) === -1) {
            // person IS available
            notFound = false;
            hero = people[person].username;
            $scope.generatedHero = people[person].username;
            console.log(people[person].username);
          } else console.log('no match going again');
        }
      }).then(function () {
        // create calendar event
        $('#calendar').fullCalendar('renderEvent', {
          title: $scope.generatedHero,
          start: date
        });
        // TODO
        // post to API
        // check if current event via date
        // remove/replace/swap
      });
    }
  };

  // Continuation of above. I know this is close. And it will allow the swap feature.
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
  $scope.addUnavailability = function (day) {
    var r = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
    if (r.test(day)) {
      availabilitySvc.addPersonUnavailability({ username: $scope.user, unavailable: day }).then(function (data) {
        console.log(data);
        $scope.unavailable.push(day);
      });
      availabilitySvc.addEventUnavailability({ username: $scope.user, start: day }).then(function (data) {
        console.log(data);
      });
    } else console.log('not valid date');
  };

  $scope.removeUnavailability = function (evt) {
    // DON'T DO THIS IN REAL LIFE
    var date = evt.path[1].lastChild.data.trim();

    availabilitySvc.removePersonUnavailability({ username: $scope.user, unavailable: date }).then(function (data) {
      console.log(data);
    });
    availabilitySvc.removeEventUnavailability({ username: $scope.user, start: date }).then(function (data) {
      console.log(data);
    });
  };

  // remove list item (unavailable)
  $scope.remove = function (array, index) {
    array.splice(index, 1);
  };

  // we should be more efficient in grabbing events
  // would be best to grab per view ex. month
  eventSvc.getEvents().then(function (events) {
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
      dayClick: function dayClick(date, view) {
        // alert('Clicked on: ' + date.format())
        // alert('Current view: ' + view.name)

        // mark day available
        if ($(this).css('background-color') === 'rgba(0, 0, 0, 0)') {
          // normal
          $(this).css('background-color', '#FFE4E1'); // make Misty Rose
          availabilitySvc.addPersonUnavailability({ username: $scope.user, unavailable: date }).then(function (data) {
            $scope.unavailable.push(date.format('YYYY-MM-DD'));
          });
          availabilitySvc.addEventUnavailability({ username: $scope.user, start: date }).then(function (data) {
            console.log(data);
          });
          // mark day unavailable  
        } else {
            $(this).css('background-color', 'rgba(0, 0, 0, 0)');
            availabilitySvc.removePersonUnavailability({ username: $scope.user, unavailable: date }).then(function (data) {
              $scope.unavailable.splice(date, 1);
            });
            availabilitySvc.removeEventUnavailability({ username: $scope.user, start: date }).then(function (data) {
              console.log(data);
            });
          }
      },

      // do something when clicking an event
      // like a small pop up maybe?
      eventClick: function eventClick(calEvent, jsEvent, view) {
        // alert('Event: ' + calEvent.title)
        // alert('View: ' + view.name)
        // change the border color just for fun
        // $(this).css('border-color', 'red')
      },

      // do something on each day
      // in this case color unavailable days
      // there is an inconsistent bug here on load
      dayRender: function dayRender(date, cell) {
        date = moment(date).format('YYYY-MM-DD');
        if ($scope.unavailable.indexOf(date) != -1) {
          cell.css("background-color", "#FFE4E1");
        }
      }
    });
  }).then(function () {
    var events = $('#calendar').fullCalendar('clientEvents');
    colorOnDutyDays(events);
    listOnDutyDays(events);
    renderCal();
    // set current hero
    var d = $('#calendar').fullCalendar('getDate').format('YYYY-MM-DD');
    eventSvc.getEvent(d).then(function (evt) {
      $scope.currentHero = evt[0].title;
    });
  });
}]);
'use strict';

// this service handles adding and removing availability
// for both people and events

supportHero.service('availabilitySvc', function ($http) {

  /**
   * adds unavailable day to person
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.unavailable - the date
   */
  this.addPersonUnavailability = function (attributes) {
    return $http.patch('/person/add-unavailability', attributes).then(function (res) {
      return res.data;
    });
  };

  /**
   * removes unavailable day from person
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.unavailable - the date
   */
  this.removePersonUnavailability = function (attributes) {
    return $http.patch('/person/remove-unavailability', attributes).then(function (res) {
      return res.data;
    });
  };

  /**
   * adds unavailable person to event 
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.start - the date
   */
  this.addEventUnavailability = function (attributes) {
    return $http.patch('/event/add-unavailability', attributes).then(function (res) {
      return res.data;
    });
  };

  /**
   * removes unavailable person from event
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.start - the date
   */
  this.removeEventUnavailability = function (attributes) {
    return $http.patch('/event/remove-unavailability', attributes).then(function (res) {
      return res.data;
    });
  };
});
'use strict';

// this service handles getting an event/events

supportHero.service('eventSvc', function ($http) {

  /**
   * get all the events
   */
  this.getEvents = function () {
    return $http.get('/events').then(function (res) {
      return res.data;
    });
  };

  /**
   * get a single event
   * @param {string} date - the date you want the event from
   */
  this.getEvent = function (date) {
    return $http.get('/event/' + date).then(function (res) {
      return res.data;
    });
  };
});
'use strict';

// this service handles getting a person or all people

supportHero.service('peopleSvc', function ($http) {

  /**
   * get all the people
   */
  this.getPeople = function () {
    return $http.get('/people').then(function (res) {
      return res.data;
    });
  };

  /**
   * get a single person
   * @param {string} user - the user you want
   */
  this.getPerson = function (user) {
    return $http.get('/person/' + user).then(function (res) {
      return res.data;
    });
  };
});