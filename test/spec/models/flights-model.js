'use strict';

describe('Service: CsvModel', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var scope, flightModel;

  beforeEach(inject(function ($rootScope, FlightModel) {
    scope = $rootScope.$new();
    flightModel = FlightModel;
  }));

  it('should should get flight delays', function () {
      var flights = [{ date: '2017-01-01',
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
      var flightDelays = flightModel.getFlightDelays(flights);
      expect(flightDelays).toEqual([8.00, -11.00]);    
  });

  it('should should get flight dates', function () {
      var flights = [{ date: '2017-01-01',
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
      var flightDates = flightModel.getFlightDates(flights);
      expect(flightDates).toEqual(['2017-01-01', '2017-01-01']);    
  });

  it('should should get flight uniqe dates', function () {
      var flightsDates = ['2017-01-01','2017-01-01'];
      var flightUniqueDates = flightModel.getFlightUniqeDates(flightsDates);
      expect(flightUniqueDates).toEqual(['2017-01-01']);    
  });

  it('should should get flight delay ratio', function () {
      var flights = [{ date: '2017-01-01',
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
      var delayRatios = flightModel.getFlightDelaysRatio(flights);
      expect(delayRatios).toEqual([4, -6]);    
  });


    it('should should get flight correlation points', function () {
      var flights = [{ date: '2017-01-01',
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
      var correlationPoints = flightModel.getCorrelationPoints(flights);
      expect(correlationPoints).toEqual([{x: '1171', y: -11.00}, {x: '1464', y: 8}]);    
  });
});
