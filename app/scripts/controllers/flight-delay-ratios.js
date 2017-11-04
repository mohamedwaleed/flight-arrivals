'use strict';

angular.module('flightArrivalApp')
  .controller('FlightDelayRatiosController', ['$scope', 'CsvModel', '$stateParams', '$state', '$rootScope', function ($scope, CsvModel, $stateParams, $state, $rootScope) {
  	
    var flights = $scope.flights;
  	if(!flights){
        return;
    }
    $scope.fullData = flights.map(function(flight) {
        var flightDelayRatio = Math.ceil((flight.arrivalDelay / flight.elapsedTime) * 100);
		return flightDelayRatio;
	});

	$scope.data = [$scope.fullData];
	
	$scope.labels = flights.map(function(flight) {
		return flight.date;
	});

	$scope.options= {
        title: {
            display: true,
            text: 'Flight delay ratios',
            fontSize: 30
        },
        legend: {
            display: true
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                	var departureTime = flights[tooltipItem.index].departureTime;
                	var arrivalTime = flights[tooltipItem.index].arrivalTime;
                    var delayPercentage = data.datasets[0].data[tooltipItem.index];
                    var displayLabel = ((delayPercentage >= 0)? delayPercentage: delayPercentage * -1) + '% ' 
                                        + ((delayPercentage >= 0)?'delay arrival':'early arrival' ) 
                                        + ' , Departure time: ' + departureTime +  ', Arrival time: ' + arrivalTime ;

                    return displayLabel;
                }
            }
        }
    }


	$scope.datasetOverride = [
	      {
	        label: "Flight delay ratio (in percentage)",
	        borderWidth: 1,
	        borderColor: "#45b7cd",
	        pointHighlightStroke : "#FF00AA",
	        hoverBackgroundColor: "rgba(255,99,132,0.4)",
	        hoverBorderColor: "rgba(255,99,132,1)",
	        type: 'bar'
	      }
	    ];
  }]);
