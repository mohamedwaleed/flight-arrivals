'use strict';

describe('Controller: AnalyticsCtrl', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var AnalyticsCtrl,
    scope, controller , rootScope, stateParams, csvModel, CsvModelImpl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
    
    rootScope = $rootScope;
    controller = $controller;
    stateParams = $stateParams;
    scope = rootScope.$new();
    CsvModelImpl = {
        searchFlights: function() {
          return [{ date: '2017-01-01',
                  origin: 'SFO' ,
                  dest: 'DFW',
                  departureTime: '11:46',
                  arrivalTime: '17:17',
                  arrivalDelay: 8.00,
                  elapsedTime: 211.00,
                  distance: 1464.00
                }];
        },
        getFlightsAsArray: function() {
          return [{ date: '2017-01-01',
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
        }
      };
  }));

  it('should invoke searchFlights and getFlightsAsArray method', function () {
      
      rootScope.ready = true;
      stateParams = {
        origin: 'SFO',
        dest: 'DFW'
      };
      
      AnalyticsCtrl = controller('AnalyticsCtrl', {
        $scope: scope,
        $stateParams: stateParams,
        CsvModel: CsvModelImpl
      });
      expect(scope.flights).not.toBeNull();
      expect(scope.flights.length).toBe(1);
      expect(scope.allFlights.length).toBe(2);
  });

it('should not invoke searchFlights and getFlightsAsArray method in case of empty origin or dest', function () {
      rootScope.ready = true;
      stateParams = {};
      
      AnalyticsCtrl = controller('AnalyticsCtrl', {
        $scope: scope,
        $stateParams: stateParams,
        CsvModel: CsvModelImpl
      });
      expect(scope.flights).toBe(undefined);
      expect(scope.allFlights).toBe(undefined);
  });
});
