'use strict'

// this is just an example

// import the moongoose helper utilities
var utils = require('../utils')
var should = require('should')
// import our User mongoose model
var Person = require('../../models/person').Person


describe('Persons: models', function () {


  describe('#create()', function () {
    it('should create a new Person', function (done) {
      // Create a User object to pass to User.create()
      var p = {
        name: {
          givenName: 'Barack',
          familyName: 'Obama'
        }
      }
      Person.create(u, function (err, createdPerson) {
        // Confirm that that an error does not exist
        should.not.exist(err)
        // verify that the returned user is what we expect
        createdPerson.name.givenName.should.equal('Barack')
        createdPerson.name.familyName.should.equal('Obama')
        // Call done to tell mocha that we are done with this test
        done()
      })
    })
  })


})
