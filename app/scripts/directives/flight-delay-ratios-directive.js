'use strict';

/* globals app */

app.directive('flightDelayRatios', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/bar-chart.html',
    controller: 'FlightDelayRatiosController'
  };
});