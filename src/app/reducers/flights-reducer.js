import {FETCH_FLIGHTS} from '../actions/types';
import CsvService from '../flight/services/csv-service';
let csvService = new CsvService();
export default function flightsReducer(state = null, action) {
    switch (action.type) {
        case FETCH_FLIGHTS:        
          return csvService.parseCsvData(action.payload.data);
    }
    return state;
}