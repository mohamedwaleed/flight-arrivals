import flightDetailsTemplate from './flight-details.html';
import flightDetailsCtrl from './flight-details-ctrl';

let flightDetailsComponentModule = angular.module('flight-details.component', []);

flightDetailsComponentModule.component('flight-details', {
    templateUrl: flightDetailsTemplate,
    controller: flightDetailsCtrl
});

export default flightDetailsComponentModule;