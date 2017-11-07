'use strict';

/* globals controllers */

controllers.controller('AnalyticsCtrl', ['$scope', 'CsvModel', '$stateParams', '$state', '$rootScope', '$mdToast',
   function ($scope, CsvModel, $stateParams, $state, $rootScope, $mdToast) {
  	$scope.origin = $stateParams.origin;
  	$scope.dest = $stateParams.dest;
    console.log($rootScope.ready);
    function calculateOverallDelayRatio(flights) {
      var avaregeRatio = 0.0;
      for(var i = 0 ; i < flights.length  ; i ++ ) {
          var flightDelayRatio = (flights[i].arrivalDelay / flights[i].elapsedTime) * 100;
          avaregeRatio +=  flightDelayRatio / flights.length;
      }
      return avaregeRatio;
    }

  	// $scope.origin = 'MIA';
  	// $scope.dest = 'SAN';
  	if(!$rootScope.ready || !$scope.origin || !$scope.dest) {
      $mdToast.show($mdToast.simple().textContent('Input is empty').position('top right'));
  		$state.go('app.dashboard');
  		return ;
  	}

  	$scope.flights = CsvModel.searchFlights($scope.origin, $scope.dest);
  	if($scope.flights.length === 0) {
      $mdToast.show($mdToast.simple().textContent('No avalible flight for given origin and destination').position('top right'));
  		$state.go('app.dashboard');
  		return;
  	}
	  $scope.overallDelayRatio = calculateOverallDelayRatio($scope.flights).toFixed(2);
    $scope.allFlights = CsvModel.getFlightsAsArray();
  }]);
