import flightDetailsTemplate from './flight-details.html';
import flightDetailsCtrl from './flight-details-ctrl';
import uiRouter from '@uirouter/angularjs';
import './flight-details.css';
import flightModule from '../../../flight';

let flightDetailsComponentModule = angular.module('flight-details.component',
 [
  uiRouter,
  flightModule.name
]);

flightDetailsComponentModule.component('flightdetails', {
    templateUrl: flightDetailsTemplate,
    controller: flightDetailsCtrl
});

export default flightDetailsComponentModule;