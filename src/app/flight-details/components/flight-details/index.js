import flightDetailsTemplate from './flight-details.html';
import flightDetailsCtrl from './flight-details-ctrl';
import uiRouter from '@uirouter/angularjs';
import './flight-details.css';

let flightDetailsComponentModule = angular.module('flight-details.component',
 [uiRouter]);

flightDetailsComponentModule.component('flightdetails', {
    templateUrl: flightDetailsTemplate,
    controller: flightDetailsCtrl
});

export default flightDetailsComponentModule;