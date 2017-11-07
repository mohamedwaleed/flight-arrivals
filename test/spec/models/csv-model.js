'use strict';

describe('Service: CsvModel', function () {

  beforeEach(module('flightArrivalApp'));

  var scope, csvModel;

  beforeEach(inject(function ($rootScope, CsvModel) {
    scope = $rootScope.$new();
    csvModel = CsvModel;
  }));

  it('should read and  parse csv data', function () {
    var promise = csvModel.readCsvFile();
    promise.then(function() {
      expect(csvModel.data).not.toBeNull();
    });
  });

  it('should search flights', function () {
    csvModel.data = {
      'SFO' : [
        { date: '2017-01-01',
          origin: 'SFO' ,
          dest: 'DFW',
          departureTime: '11:46',
          arrivalTime: '17:17',
          arrivalDelay: 8.00,
          elapsedTime: 211.00,
          distance: 1464.00
        }],
      'SAN' : [{ date: '2017-01-01',
          origin: 'SAN' ,
          dest: 'DFW',
          departureTime: '14:30',
          arrivalTime: '19:27',
          arrivalDelay: -11.00,
          elapsedTime: 177.00,
          distance: 1171.00
        }]
    };
    var expected = { date: '2017-01-01',
          origin: 'SFO' ,
          dest: 'DFW',
          departureTime: '11:46',
          arrivalTime: '17:17',
          arrivalDelay: 8.00,
          elapsedTime: 211.00,
          distance: 1464.00
    };
    var flights = csvModel.searchFlights('SFO', 'DFW');
    expect(flights.length).toBe(1);
    expect(flights[0]).toEqual(expected);
  });

  it('should return null when search non existing flights', function () {
    csvModel.data = {
      'SFO' : [
        { date: '2017-01-01',
          origin: 'SFO' ,
          dest: 'DFW',
          departureTime: '11:46',
          arrivalTime: '17:17',
          arrivalDelay: 8.00,
          elapsedTime: 211.00,
          distance: 1464.00
        }],
      'SAN' : [{ date: '2017-01-01',
          origin: 'SAN' ,
          dest: 'DFW',
          departureTime: '14:30',
          arrivalTime: '19:27',
          arrivalDelay: -11.00,
          elapsedTime: 177.00,
          distance: 1171.00
        }]
    };
    var expected = [];
    var flights = csvModel.searchFlights('LAS', 'DFW');
    expect(flights).toEqual(expected);
  });

  it('should get flights as array', function () {
      csvModel.data = {
      'SFO' : [
        { date: '2017-01-01',
          origin: 'SFO' ,
          dest: 'DFW',
          departureTime: '11:46',
          arrivalTime: '17:17',
          arrivalDelay: 8.00,
          elapsedTime: 211.00,
          distance: 1464.00
        }],
      'SAN' : [{ date: '2017-01-01',
          origin: 'SAN' ,
          dest: 'DFW',
          departureTime: '14:30',
          arrivalTime: '19:27',
          arrivalDelay: -11.00,
          elapsedTime: 177.00,
          distance: 1171.00
        }]
    };
    var flights = csvModel.getFlightsAsArray();
    expect(flights.length).toBe(2);
  });
});
