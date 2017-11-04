'use strict';

angular.module('flightArrivalApp')
 .directive('flightDelayRatios', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/chart.html',
    controller: 'FlightDelayRatiosController'
  };
});