'use strict';

angular.module('flightArrivalApp')
  .controller('DashboardCtrl', ['$scope', 'CsvModel', '$state', '$mdToast', 
  	function ($scope, CsvModel, $state, $mdToast) {
     $scope.origin = '';
     $scope.dest = '';

     $scope.searchFlights = function() {
     	$state.go('app.analytics', {origin: $scope.origin, dest: $scope.dest});
     };
     
  }]);
