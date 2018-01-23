import { combineReducers } from 'redux';
import flightsReducer from './flights-reducer';

const rootReducer = combineReducers({
  flights: flightsReducer
});

export default rootReducer;