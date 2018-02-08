import {createSelector} from 'reselect';
import FlightService from '../flight/services/flights-service';

const flightService = new FlightService();

const flightMapSelector = state => state.flights;
const selectedFlightSelector = state => state.selectedFlight;

const flightSelector = createSelector(
    flightMapSelector,
    selectedFlightSelector,
    (flightsMap, selectedFlight) => flightService.searchFlights(flightsMap, selectedFlight)
);

const recommendFlightsSelector = createSelector(
    flightSelector,
    flights => flightService.recommendFlights(flights)
);

const getFlightDelaysSelector = createSelector(
    flightSelector,
    flights => flightService.getFlightsDatesAndDelays(flights)
);

const getOverallDelaysRatioSelector = createSelector(
    flightSelector,
    flights => flightService.getOverallDelayRatio(flights)
);


const getCorrelationPointsSelector = createSelector(
    flightMapSelector,
    flightsMap => {
      let flights =  flightService.getFlightsAsArray(flightsMap);
      return  flightService.getCorrelationPoints(flights)
    }
);

export {
    flightSelector as selectFlight,
    getCorrelationPointsSelector as getCorrelationPoints,
    recommendFlightsSelector as recommendFlights,
    getFlightDelaysSelector as getFlightDelays,
    getOverallDelaysRatioSelector as getOverallDelaysRatio
};

