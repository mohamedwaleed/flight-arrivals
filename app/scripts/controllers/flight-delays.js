'use strict';

/* globals controllers */

controllers.controller('FlightDelaysController', ['$scope', 'FlightModel', function ($scope, FlightModel) {
  	var flights = $scope.flights;
    if(!flights){
        return;
    }
  	var fullData = FlightModel.getFlightDelays(flights);
    var fullLabels = FlightModel.getFlightDates(flights);
	$scope.labels = fullLabels;

    $scope.dates = FlightModel.getFlightUniqeDates($scope.labels);

    $scope.data = [fullData];

    $scope.selectFlightsDelaysOnDate = function() {
        var date = $scope.selectedDate;
        if(date === 'all') {
            $scope.data = [fullData];
            $scope.labels = fullLabels;
            return ;
        }
        var filteredFlights = flights.filter(function(flight) {
            return flight.date === date;
        });
        var flightDelays = FlightModel.getFlightDelays(filteredFlights);

        $scope.data = [flightDelays];
        $scope.labels = [];
        for(var i = 0 ; i < flightDelays.length ; i ++ ) {
            $scope.labels.push(date);
        }
    };

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
                	var dsiplayedLabel = data.datasets[0].data[tooltipItem.index] +
                                         ' Miniuts , Departure time: ' + departureTime +
                                         ', Arrival time: ' + arrivalTime ;
                    return dsiplayedLabel;
                }
            }
        }
    };


	$scope.datasetOverride = [
	      {
	        label: 'Flight delay (in miniuts)',
	        borderWidth: 1,
	        borderColor: '#45b7cd',
	        pointHighlightStroke : '#FF00AA',
	        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	        hoverBorderColor: 'rgba(255,99,132,1)',
	        type: 'bar'
	      }
	    ];
  }]);
