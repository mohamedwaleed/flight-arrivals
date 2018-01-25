import uiRouter from '@uirouter/angularjs';
import flightDetailsConfig from './config';
import flightDetailsComponent from './components/flight-details';

const flightDetailsModule = angular.module('flight-details', [
    uiRouter,
    flightDetailsComponent.name
]);

flightDetailsModule.config(flightDetailsConfig);

export default flightDetailsModule;