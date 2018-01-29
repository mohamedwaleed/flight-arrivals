import { combineReducers } from 'redux';
import flightsReducer from './flights-reducer';
import selectFlightReducer from './select-flight-reducer';

const rootReducer = combineReducers({
  flights: flightsReducer,
  selectedFlight: selectFlightReducer
});

export default rootReducer;