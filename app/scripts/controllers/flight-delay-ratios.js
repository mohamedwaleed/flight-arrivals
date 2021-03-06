'use strict';

/* globals controllers */

controllers.controller('FlightDelayRatiosController', ['$scope', 'FlightModel',function ($scope, FlightModel) {
  	
    var flights = $scope.flights;
  	if(!flights){
        return;
    }
    var fullData = FlightModel.getFlightDelaysRatio(flights);
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
                    var displayLabel = ((delayPercentage >= 0)? delayPercentage: delayPercentage * -1) + '% ' +
                                       ((delayPercentage >= 0)?'delay arrival':'early arrival' ) +
                                       ' , Departure time: ' + departureTime +  ', Arrival time: ' + arrivalTime ;

                    return displayLabel;
                }
            }
        }
    };


	$scope.datasetOverride = [
	      {
	        label: 'Flight delay ratio (in percentage)',
	        borderWidth: 1,
	        borderColor: '#45b7cd',
	        pointHighlightStroke : '#FF00AA',
	        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	        hoverBorderColor: 'rgba(255,99,132,1)',
	        type: 'bar'
	      }
	    ];
  }]);
