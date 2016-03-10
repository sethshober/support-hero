supportHero.service('eventSvc', function ($http) {
  this.getEvents = function() {
    return $http.get('/events')
    .then(function(res){
      return res.data
    })
  }

  this.getEvent = function(date) {
    return $http.get('/event/' + date)
    .then(function(res){
      return res.data
    })
  }
})