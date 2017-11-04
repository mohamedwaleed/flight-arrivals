'use strict';

angular.module('flightArrivalApp')
 .directive('delaysCorrelation', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/chart.html',
    controller: 'DelaysCorrelationController'
  };
});