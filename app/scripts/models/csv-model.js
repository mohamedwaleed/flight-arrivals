'use strict';

function CsvModel(CsvService) {
    this.data = null;
    var thisModel = this;
    /////////////////////////// helpers


    function parseCsvData(data) {
      var parsedData = {}; // array of objects
      var lines = data.split('\n');
      for(let i = 1 ; i < lines.length; i ++ ) {
        let line = lines[i];
        if(!line){
          continue;
        }
        let fields = line.split(',');
        let origin = fields[1].trim().substring(1, fields[1].trim().length - 1);
        let dest = fields[2].trim().substring(1, fields[2].trim().length - 1);
        let departureTime = fields[3].trim().substring(1, 3) + ":" + fields[3].trim().substring(3, fields[3].trim().length - 1);
        let arrivalTime = fields[4].trim().substring(1, 3) + ":" + fields[4].trim().substring(3, fields[4].trim().length - 1);
        if(fields[5] === ""){
          fields[5] = '0.0';
        }
        let flightObject = {
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
        console.log("fail");
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
    }
    thisModel.getFlightsAsArray = function() {
      if(!thisModel.data){
        return [];
      }
      var flightsArray = [];
      // can use lodash to reduce the logic
      var keys = Object.keys(thisModel.data);
      for(let i = 0 ; i < keys.length ; i ++ ) {
          flightsArray = flightsArray.concat(thisModel.data[keys[i]]);
      }
      return flightsArray;
    }
    ////////////////////////////////////////////////////
}


angular
  .module('flightArrivalApp')
  .factory('CsvModel', ['CsvService',
    function(CsvService) {
        return new CsvModel(CsvService);
    }]);
