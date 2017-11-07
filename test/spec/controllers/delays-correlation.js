'use strict';

describe('Controller: DelaysCorrelationController', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var DelaysCorrelationController,
    scope, $state;

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
    DelaysCorrelationController = $controller('DelaysCorrelationController', {
      $scope: scope
    });
  }));

  it('should contain data', function () {
        var correlationPoints = [{x: '1171', y: -11} , {x: '1464', y: 8}];
        expect(scope.data).toEqual([correlationPoints]);
  });

});
