'use strict';

describe('Controller: CsvService', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var csvService, scope;

  beforeEach(inject(function ($rootScope, CsvService, $httpBackend) {
    scope = $rootScope.$new();
    csvService = CsvService;
    $httpBackend
    .when('GET', 'Flight-Delays.csv')
    .respond(200, '');
  }));

  it('should get flights from csv file', function () {
    
    var promise = csvService.getFlights();
    promise.then(function(response) {
      expect(response).toBe('');
    });
    
  });

});
