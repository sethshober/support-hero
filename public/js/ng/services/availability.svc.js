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
    return $http.patch('/person/add-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  /**
   * removes unavailable day from person
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.unavailable - the date
   */
  this.removePersonUnavailability = function (attributes) {
    return $http.patch('/person/remove-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  /**
   * adds unavailable person to event 
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.start - the date
   */
  this.addEventUnavailability = function (attributes) {
    return $http.patch('/event/add-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

  /**
   * removes unavailable person from event
   * @param {object} attributes - the user and date
   * @param attributes.username - the user
   * @param attributes.start - the date
   */
  this.removeEventUnavailability = function (attributes) {
    return $http.patch('/event/remove-unavailability', attributes)
    .then(function(res){
      return res.data
    })
  }

})