'use strict';

/* globals app */

app.directive('flightDelays', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/bar-chart.html',
    controller: 'FlightDelaysController'
  };
});