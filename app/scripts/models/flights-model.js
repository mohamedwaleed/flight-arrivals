'use strict';

/* globals services */

function FlightModel() {
    
    /// return flight delays as an array ///
    this.getFlightDelays = function(flights) {
      return flights.map(function(flight) {
        return flight.arrivalDelay;
      });
    };

    this.getFlightDates = function(flights) {
      return flights.map(function(flight) {
        return flight.date;
      });
    };

    this.getFlightUniqeDates = function(flightsDates) {
      var dateMap = {};
      for (var i = 0; i < flightsDates.length; i++){
          dateMap[flightsDates[i]] = true;
      }
      return Object.keys(dateMap);
    };

    this.getFlightDelaysRatio = function(flights) {
      return flights.map(function(flight) {
            var flightDelayRatio = Math.ceil((flight.arrivalDelay / flight.elapsedTime) * 100);
        return flightDelayRatio;
      });
    };

    this.getCorrelationPoints = function(flights) {
      var flightDistanceMap = {};
      flights.forEach(function(flight) {
          if(!flightDistanceMap[flight.distance]){
              
              flightDistanceMap[flight.distance] = {
                  sum: 0,
                  count: 0
              };
          }
          flightDistanceMap[flight.distance].sum += flight.arrivalDelay;
          flightDistanceMap[flight.distance].count ++;

      });
      var correlationPoints = [];
      var keys = Object.keys(flightDistanceMap);
      for(var i = 0 ; i < keys.length ; i ++ ) {
          var distance = keys[i];
          var avgDelayas = flightDistanceMap[distance].sum / flightDistanceMap[distance].count;
          correlationPoints.push({x: distance, y: avgDelayas});
      }
      return correlationPoints;
    };
}


services.factory('FlightModel', [
    function() {
        return new FlightModel();
    }]);
