'use strict';

/* globals services */

function CsvModel(CsvService, $log) {
    this.data = null;
    var thisModel = this;
    /////////////////////////// helpers


    function parseCsvData(data) {
      var parsedData = {}; // array of objects
      var lines = data.split('\n');
      for(var i = 1 ; i < lines.length; i ++ ) {
        var line = lines[i];
        if(!line){
          continue;
        }
        var fields = line.split(',');
        var origin = fields[1].trim().substring(1, fields[1].trim().length - 1);
        var dest = fields[2].trim().substring(1, fields[2].trim().length - 1);
        var departureTime = fields[3].trim().substring(1, 3) + ':' + fields[3].trim().substring(3, fields[3].trim().length - 1);
        var arrivalTime = fields[4].trim().substring(1, 3) + ':' + fields[4].trim().substring(3, fields[4].trim().length - 1);
        if(fields[5] === ''){
          fields[5] = '0.0';
        }
        var flightObject = {
          date: fields[0],
          origin: origin,
          dest: dest,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
          arrivalDelay: parseFloat(fields[5]),
          elapsedTime: parseFloat(fields[6]),
          distance: parseFloat(fields[7])
        };
        if(parsedData[flightObject.origin] === undefined){
          parsedData[flightObject.origin] = [flightObject];
        }else {
          parsedData[flightObject.origin].push(flightObject);
        }
      }
      return parsedData;
    }


    /////////////////////////////////////////////


    ////////////////////////////////////// public api
    thisModel.readCsvFile = function() {
      var csvPromise = CsvService.getFlights();
      var onSuccess = function(response) {
        thisModel.data = parseCsvData(response.data);
      };
      var onFail = function() {
        $log.info('fail');
      };

      return csvPromise.then(onSuccess, onFail);
    };
    
    thisModel.searchFlights = function(origin, destination) {
      if(!thisModel.data[origin]){
        return [];
      }
      return thisModel.data[origin].filter(function(flight) {
        return flight.dest === destination;
      });
    };

    thisModel.getFlightsAsArray = function() {
      if(!thisModel.data){
        return [];
      }
      var flightsArray = [];
      // can use lodash to reduce the logic
      var keys = Object.keys(thisModel.data);
      for(var i = 0 ; i < keys.length ; i ++ ) {
          flightsArray = flightsArray.concat(thisModel.data[keys[i]]);
      }
      return flightsArray;
    };
    ////////////////////////////////////////////////////
}


services.factory('CsvModel', ['CsvService', '$log',
    function(CsvService, $log) {
        return new CsvModel(CsvService, $log);
    }]);
