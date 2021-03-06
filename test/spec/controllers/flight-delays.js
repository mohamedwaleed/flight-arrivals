'use strict';

describe('Controller: FlightDelayController', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var FlightDelaysController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.flights = [{ date: '2017-01-01',
                  origin: 'SFO' ,
                  dest: 'DFW',
                  departureTime: '11:46',
                  arrivalTime: '17:17',
                  arrivalDelay: 8.00,
                  elapsedTime: 211.00,
                  distance: 1464.00
                },
                { date: '2017-01-01',
                  origin: 'SAN' ,
                  dest: 'DFW',
                  departureTime: '14:30',
                  arrivalTime: '19:27',
                  arrivalDelay: -11.00,
                  elapsedTime: 177.00,
                  distance: 1171.00
                }];
    FlightDelaysController = $controller('FlightDelaysController', {
      $scope: scope,
    });
  }));

  it('should contain labels', function () {
        expect(scope.labels).toEqual(['2017-01-01', '2017-01-01']);
  });
  it('should contain dates', function () {
        expect(scope.dates).toEqual(['2017-01-01']);
  });
  it('should contain data', function () {
        expect(scope.data).toEqual([[8, -11]]);
  });

  it('should change data and labels based on date', function () {
        scope.selectedDate = '2017-01-01';
        scope.selectFlightsDelaysOnDate();
        expect(scope.data).toEqual([[8, -11]]);
        expect(scope.labels).toEqual(['2017-01-01', '2017-01-01']);
  });
});
