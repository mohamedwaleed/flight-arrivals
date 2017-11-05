'use strict';

/* globals controllers */

controllers.controller('DashboardCtrl', ['$scope', 'CsvModel', '$state', 
  	function ($scope, CsvModel, $state) {
     $scope.origin = '';
     $scope.dest = '';

     $scope.searchFlights = function() {
     	$scope.origin = $scope.origin.toUpperCase();
     	$scope.dest = $scope.dest.toUpperCase();
     	$state.go('app.analytics', {origin: $scope.origin, dest: $scope.dest});
     };
     
  }]);
