// this service handles getting a person or all people

supportHero.service('peopleSvc', function ($http) {

  /**
   * get all the people
   * @returns {array} the people
   */
  this.getPeople = function() {
    return $http.get('/people')
    .then(function(res){
      return res.data
    })
  }

  /**
   * get a single person
   * @param {string} user - the user you want
   * @returns {object} the person
   */
  this.getPerson = function(user) {
    return $http.get('/person/' + user)
    .then(function(res){
      return res.data
    })
  }
})