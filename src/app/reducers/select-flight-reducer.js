import {SELECT_FLIGHT} from '../actions/types';
export default function selectFlightReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_FLIGHT:        
          return action.payload;
    }
    return state;
}