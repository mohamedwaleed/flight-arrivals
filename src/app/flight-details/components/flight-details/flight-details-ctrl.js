
class FlightDetailsCtrl {
    constructor($log, $stateParams) {
     'ngInject';
     if(!$stateParams.origin || !$stateParams.destination) {
        // $state.go('app.dashboard');
        // return;
     }
     this.$log = $log;
     this.origin = $stateParams.origin;
     this.dest = $stateParams.destination;
    } 
 }
 
 export default FlightDetailsCtrl;