supportHero.service('availabilitySvc', function ($http) {
  this.addPersonUnavailability = function (attributes) {
    return $http.patch('/person/add-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  this.removePersonUnavailability = function (attributes) {
    return $http.patch('/person/remove-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  this.addEventUnavailability = function (attributes) {
    return $http.patch('/event/add-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  this.removeEventUnavailability = function (attributes) {
    return $http.patch('/event/remove-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }
})