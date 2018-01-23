import {FETCH_FLIGHTS} from '../actions/types';
import csvService from '../flight/services/csv-service';

export default function flightsReducer(state = null, action) {
    switch (action.type) {
        case FETCH_FLIGHTS:        
          return csvService.parseCsvData(action.payload.data);
    }
    return state;
}