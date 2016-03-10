// this service handles getting an event/events

supportHero.service('eventSvc', function ($http) {

  /**
   * get all the events
   */
  this.getEvents = function() {
    return $http.get('/events')
    .then(function(res){
      return res.data
    })
  }

  /**
   * get a single event
   * @param {string} date - the date you want the event from
   */
  this.getEvent = function(date) {
    return $http.get('/event/' + date)
    .then(function(res){
      return res.data
    })
  }
})