import flightService from './services/flights-service';
import csvService from './services/csv-service';

let flightModule = angular.module('flight', []);

flightModule.service('flightService', flightService);
flightModule.service('csvService', csvService);


export default flightModule;