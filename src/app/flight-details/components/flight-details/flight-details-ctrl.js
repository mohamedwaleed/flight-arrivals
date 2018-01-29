import d3 from 'd3/d3';
import * as actions from '../../../actions';
import {
    selectFlight,
    getCorrelationPoints
} from '../../../selectors/search-flights-selector';

class FlightDetailsCtrl {
    constructor($log, $stateParams, flightService, $ngRedux, $scope) {
     'ngInject';
     if(!$stateParams.origin || !$stateParams.destination) {
        // $state.go('app.dashboard');
        // return;
     }
     this.origin = $stateParams.origin;
     this.dest = $stateParams.destination;

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
   
        let unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.correlationPointsAvalibile = false;
    } 

    $onInit() {
        this.selectFlight(this.origin, this.dest);
    }

  
    $doCheck() {
        console.log("check");
        

        if(this.correlationPoints && !this.correlationPointsAvalibile) {
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
                    useInteractiveGuideline: true,
                    showValues: false,
                    duration: 100,
                    xAxis: {
                        axisLabel: 'Distance in miles',
                        rotateLabels: 30,
                        showMaxMin: true
                    },
                    yAxis: {
                        axisLabel: 'Avarage delays in minutes',
                        axisLabelDistance: 20,
                    },
                    tooltip: {
                        keyFormatter: function(d) {
                            return d3.time.format('%x')(new Date(d));
                        }
                    },
                    // forceX: [0, 3000],
                    // forceY: [-40, 140]
                }
                };
                this.data1 = [
                    {
                        key: "Correlation between delays and distance",
                        values: [ [1000,1] , [10,5] , [15, 10] , [20, 7], [25, 6] , [30, 15], [35, -1000]],
                        mean: 500
                    }
                ];
                this.correlationPointsAvalibile = true;
                console.log(this.correlationPoints);
        }
    }

    mapStateToThis(state) {
        return {
            selectedFlight: selectFlight(state),
            correlationPoints: getCorrelationPoints(state)
        }
    }
 }
 
 export default FlightDetailsCtrl;