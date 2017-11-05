'use strict';

/* globals app */

app.directive('delaysCorrelation', function() {
  return {
    restrict: 'E',
    scope: {
      flights: '=flights'
    },
    templateUrl: 'views/chart.html',
    controller: 'DelaysCorrelationController'
  };
});