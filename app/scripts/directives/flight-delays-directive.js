'use strict';

angular.module('flightArrivalApp')
 .directive('flightDelays', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/chart.html',
    controller: 'FlightDelaysController'
  };
});