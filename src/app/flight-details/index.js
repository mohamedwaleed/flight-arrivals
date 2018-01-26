import uiRouter from '@uirouter/angularjs';
import flightDetailsConfig from './config';
import flightDetailsComponentModule from './components/flight-details';

const flightDetailsModule = angular.module('flight-details', [
    uiRouter,
    flightDetailsComponentModule.name
]);

flightDetailsModule.config(flightDetailsConfig);

export default flightDetailsModule;