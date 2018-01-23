import axios from 'axios';
import {FETCH_FLIGHTS} from './types';

export function fetchFlights() {
    let request = axios.get('/Flight-Delays.csv');
    return {
        type: FETCH_FLIGHTS,
        payload: request
    };
}