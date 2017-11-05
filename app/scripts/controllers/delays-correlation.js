'use strict';

angular.module('flightArrivalApp')
  .controller('DelaysCorrelationController', ['$scope',  function ($scope) {
  	var flights = $scope.flights;
    if(!flights){
        return;
    }
    var flightDistanceMap = {};
    flights.forEach(function(flight) {
        if(!flightDistanceMap[flight.distance]){
            
            flightDistanceMap[flight.distance] = {
                sum: 0,
                count: 0
            };
        }
        flightDistanceMap[flight.distance].sum += flight.arrivalDelay;
        flightDistanceMap[flight.distance].count ++;

    });
    $scope.fullData = [];
    var keys = Object.keys(flightDistanceMap);
    for(var i = 0 ; i < keys.length ; i ++ ) {
        var distance = keys[i];
        var avgDelayas = flightDistanceMap[distance].sum / flightDistanceMap[distance].count;
        $scope.fullData.push({x: distance, y: avgDelayas});
    }

	$scope.data =  [$scope.fullData];

	$scope.options= {
        title: {
            display: true,
            text: 'Correlation between delays and distances',
            fontSize: 30
        },
        legend: {
            display: true
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                	var dsiplayedLabel = data.datasets[0].data[tooltipItem.index].x + ' miles and '+
                                        data.datasets[0].data[tooltipItem.index].y + ' miniuts avarage delay' ;
                    return dsiplayedLabel;
                }
            }
        },
        scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
    };


	$scope.datasetOverride = [
	      {
	        label: "X axes ( distances in miles ) Y axes ( avarage delays in miniuts)",
	        borderWidth: 1,
	        borderColor: "#45b7cd",
	        pointHighlightStroke : "#FF00AA",
	        hoverBackgroundColor: "rgba(255,99,132,0.4)",
	        hoverBorderColor: "rgba(255,99,132,1)",
	        type: 'scatter'
	      }
	    ];
  }]);
