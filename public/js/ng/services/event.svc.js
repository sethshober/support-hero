// this service handles getting an event/events

supportHero.service('eventSvc', function ($http) {

  /**
   * get all the events
   * @returns {array} the events
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
   * @returns {object} the event
   */
  this.getEvent = function(date) {
    return $http.get('/event/' + date)
    .then(function(res){
      return res.data
    })
  }

  /**
   * create an event
   * @param {object} attributes - title and start
   * @param attributes.title - title is the hero name
   * @param attributes.start - start is the date
   */
  this.createEvent = function(attributes) {
    return $http.post('/event', attributes)
    .then(function(res){
      return res.data
    })
  }

  /**
   * delete an event
   * @param {string} date - date of event
   */
  this.removeEvent = function(date) {
    return $http.delete('/event/' + date)
    .then(function(res){
      return res.data
    })
  }

})