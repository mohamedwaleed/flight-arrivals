'use strict';

/* globals app */

app.directive('delaysCorrelation', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/scatter-chart.html',
    controller: 'DelaysCorrelationController'
  };
});