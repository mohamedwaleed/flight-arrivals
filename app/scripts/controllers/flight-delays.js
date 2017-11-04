'use strict';

angular.module('flightArrivalApp')
  .controller('FlightDelaysController', ['$scope', 'CsvModel', '$stateParams', '$state', '$rootScope', function ($scope, CsvModel, $stateParams, $state, $rootScope) {
  	var flights = $scope.flights;
    if(!flights){
        return;
    }
  	$scope.fullData = flights.map(function(flight) {
		return flight.arrivalDelay;
	});

	$scope.data = [$scope.fullData];
	
	$scope.labels = flights.map(function(flight) {
		return flight.date;
	});

	$scope.options= {
        title: {
            display: true,
            text: 'Flight delays',
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
                	var dsiplayedLabel = data.datasets[0].data[tooltipItem.index] 
                						+ ' Miniuts , Departure time: ' + departureTime 
                						+  ', Arrival time: ' + arrivalTime ;
                    return dsiplayedLabel;
                }
            }
        }
    }


	$scope.datasetOverride = [
	      {
	        label: "Flight delay (in miniuts)",
	        borderWidth: 1,
	        borderColor: "#45b7cd",
	        pointHighlightStroke : "#FF00AA",
	        hoverBackgroundColor: "rgba(255,99,132,0.4)",
	        hoverBorderColor: "rgba(255,99,132,1)",
	        type: 'bar'
	      }
	    ];
  }]);
