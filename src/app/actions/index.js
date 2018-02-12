import axios from 'axios';
import {FETCH_FLIGHTS, SELECT_FLIGHT} from './types';

export function fetchFlights() {
    let request = axios.get('Flight-Delays.csv');
    return {
        type: FETCH_FLIGHTS,
        payload: request
    };
}

export function selectFlight(origin, dest) {
    return {
        type: SELECT_FLIGHT,
        payload: {
            origin: origin,
            dest: dest
        }
    }
}