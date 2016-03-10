supportHero.service('peopleSvc', function ($http) {
  this.getPeople = function() {
    return $http.get('/people')
    .then(function(res){
      return res.data
    })
  }

  this.getPerson = function(user) {
    return $http.get('/person/' + user)
    .then(function(res){
      return res.data
    })
  }
})