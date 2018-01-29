import d3 from 'd3/d3';

class FlightDetailsCtrl {
    constructor($log, $stateParams, flightService) {
     'ngInject';
     if(!$stateParams.origin || !$stateParams.destination) {
        // $state.go('app.dashboard');
        // return;
     }
     this.$log = $log;
     this.origin = $stateParams.origin;
     this.dest = $stateParams.destination;
     this.flightService = flightService;
     this.options = {
        chart: {
            type: 'historicalBarChart',
            height: 400,
            margin : {
                top: 20,
                right: 20,
                bottom: 65,
                left: 50
            },
            x: function(d){return d[0];},
            y: function(d){return d[1];},
            showValues: true,
            duration: 100,
            xAxis: {
                axisLabel: 'X Axis',
                rotateLabels: 30,
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10,
            },
            tooltip: {
                keyFormatter: function(d) {
                    return d3.time.format('%x')(new Date(d));
                }
            },
            zoom: {
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: true,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };

    this.data = [
        {
            "key" : "Quantity" ,
            "bar": true,
            "values" : [ [5,1] , [10,5] , [15, 10] , [20, 7], [25, 6] , [30, 15], [35, -25]]
        }];
    this.options1 = {
        chart: {
            type: 'cumulativeLineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 65,
                left: 50
            },
            x: function(d){return d[0];},
            y: function(d){return d[1];},
            showValues: true,
            duration: 100,
            xAxis: {
                axisLabel: 'Distance in miles',
                rotateLabels: 30,
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Avarage delays in minutes',
                axisLabelDistance: -10,
            },
            tooltip: {
                keyFormatter: function(d) {
                    return d3.time.format('%x')(new Date(d));
                }
            }
        }
        };
    
        this.data1 = [
            {
                key: "Long",
                values: [ [5,1] , [10,5] , [15, 10] , [20, 7], [25, 6] , [30, 15], [35, -25]]
                ,
                mean: 250
            }
        ];
    } 


    
 }
 
 export default FlightDetailsCtrl;