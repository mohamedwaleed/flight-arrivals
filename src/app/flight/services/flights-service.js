'use strict';

class FlightsService {
    
    constructor(){
        'ngInject';
    }
    getFlightsAsArray(flightsMap) {
        if(!flightsMap){
          return [];
        }
        let flightsArray = [];
        // can use lodash to reduce the logic
        let keys = Object.keys(flightsMap);
        for(let i = 0 ; i < keys.length ; i ++ ) {
            flightsArray = flightsArray.concat(flightsMap[keys[i]]);
        }
        return flightsArray;
    }

    getFlightsStates(flightsMap) {
        if(!flightsMap) {
            return [];
        }
        let flightsStates = {};
        let keys = Object.keys(flightsMap);
        keys.forEach(key => {
            flightsStates[key] = true;
            let flights = flightsMap[key];
            flights.forEach(flight => {
                flightsStates[flight.dest] = true;
            });
        });
        return Object.keys(flightsStates).map(state => ({name:state}));
    }

    /// return flight delays as an array ///
    getFlightDelays(flights) {
      return flights.map(function(flight) {
        return flight.arrivalDelay;
      });
    }

    getFlightDates(flights) {
      return flights.map(function(flight) {
        return flight.date;
      });
    }

    getFlightUniqeDates(flightsDates) {
      let dateMap = {};
      for (let i = 0; i < flightsDates.length; i++){
          dateMap[flightsDates[i]] = true;
      }
      return Object.keys(dateMap);
    }

    getFlightDelaysRatio(flights) {
      return flights.map(function(flight) {
            let flightDelayRatio = Math.ceil((flight.arrivalDelay / flight.elapsedTime) * 100);
        return flightDelayRatio;
      });
    }

    getCorrelationPoints(flights) {
      let flightDistanceMap = {};
      flights.forEach(function(flight) {
          if(!flightDistanceMap[flight.distance]){
              
              flightDistanceMap[flight.distance] = {
                  sum: 0,
                  count: 0
              };
          }
          flightDistanceMap[flight.distance].sum += flight.arrivalDelay;
          flightDistanceMap[flight.distance].count ++;

      })
      let correlationPoints = [];
      let keys = Object.keys(flightDistanceMap);
      for(let i = 0 ; i < keys.length ; i ++ ) {
          let distance = keys[i];
          let avgDelayas = flightDistanceMap[distance].sum / flightDistanceMap[distance].count;
          correlationPoints.push({x: distance, y: avgDelayas});
      }
      return correlationPoints;
    }
}

export default FlightsService;