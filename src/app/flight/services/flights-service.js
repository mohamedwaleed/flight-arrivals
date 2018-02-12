'use strict';

class FlightsService {
    
    constructor(){
        'ngInject';
    }

    searchFlights(flightsMap, selectedFlight) {
        let origin = selectedFlight.origin;
        let dest = selectedFlight.dest;
        let originFlights = flightsMap[origin];
        if(!originFlights) {
            return [];
        }
        
        return originFlights.filter(flight => flight.dest === dest);
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
    getFlightsDatesAndDelays(flights) {
        return flights.map(function(flight) {
            return {
                date: Date.parse(flight.date),
                delay: flight.arrivalDelay,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                elapsedTime: flight.elapsedTime
            };
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

    getOverallDelayRatio(flights) {  
        let avg = 0.0;
        for(let i = 0 ; i < flights.length; i ++ ) {
            let flightDelayRatio = (flights[i].arrivalDelay / flights[i].elapsedTime) * 100;
            avg += flightDelayRatio / flights.length;
        }
        return avg.toFixed(2);
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
          correlationPoints.push({x: parseFloat(distance), y: avgDelayas});
      }
      return correlationPoints;
    }
    
    recommendFlights(__flights__) {
        // recommendation based on minumum delays
        let myFlights = [...__flights__];
        /* eslint-disable no-console */
/* eslint-enable no-console */
        let getMinumum = (flights, len) => {
            let mini = {};
            let minIdx = -1;
            for(let i = 0 ; i < len; i ++) {
                if(mini.arrivalDelay) {
                    if(mini.arrivalDelay > flights[i].arrivalDelay) {
                        mini = flights[i];
                        minIdx = i;
                    }
                }else {
                    mini = flights[i];
                    minIdx = i;
                }
            }
            return {index: minIdx, value: mini};
        };
        let swap = (flights, i, j) => {
            let tmpFlight = flights[i];
            flights[i] = flights[j];
            flights[j] = tmpFlight;
        }
        
        let minimum = getMinumum(myFlights, myFlights.length);
        swap(myFlights, minimum.index, myFlights.length - 1);

        minimum = getMinumum(myFlights, myFlights.length - 1);
        swap(myFlights, minimum.index, myFlights.length - 2);

        minimum = getMinumum(myFlights, myFlights.length - 2);
        swap(myFlights, minimum.index, myFlights.length - 3);

        
        return [myFlights[myFlights.length - 1], myFlights[myFlights.length - 2], myFlights[myFlights.length - 3]];
    }
}

export default FlightsService;