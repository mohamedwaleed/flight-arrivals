import d3 from 'd3/d3';
import * as actions from '../../../actions';
import {
    selectFlight,
    getCorrelationPoints,
    recommendFlights,
    getOverallDelaysRatio,
    getFlightDelays
} from '../../../selectors/search-flights-selector';

class FlightDetailsCtrl {
    constructor($log, $stateParams, flightService, $ngRedux, $scope, $state) {
        'ngInject';
        if (!$stateParams.origin || !$stateParams.destination) {
            $state.go('app.dashboard');
            return;
        }
        this.origin = $stateParams.origin;
        this.dest = $stateParams.destination;

        this.$log = $log;
        this.origin = $stateParams.origin;
        this.dest = $stateParams.destination;
        this.flightService = flightService;
        

        let unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.correlationPointsAvalibile = false;
        this.flightDelaysAvalible = false;
    }

    $onInit() {
        this.selectFlight(this.origin, this.dest);
    }

    configureFlightDelaysGraph() {

        if (this.flightDelays && !this.flightDelaysAvalible) {
            this.flightDelayOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 400,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    x: function (d) { return d.date; },
                    y: function (d) { return d.delay; },
                    showValues: false,
                    duration: 100,
                    xAxis: {
                        axisLabel: 'Flight date',
                        rotateLabels: 30,
                        tickFormat: function(d) {
                            return d3.time.format('%x')(new Date(d))
                        },
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Flight delay in minutes',
                        axisLabelDistance: -10,
                    },
                    tooltip: {
                        keyFormatter: function (d) {
                            return d3.time.format('%x')(new Date(d));
                        }
                    },
                    // zoom: {
                    //     enabled: true,
                    //     scaleExtent: [1, 10],
                    //     useFixedDomain: false,
                    //     useNiceScale: false,
                    //     horizontalOff: false,
                    //     verticalOff: true,
                    //     unzoomEventType: 'dblclick.zoom'
                    // }
                },
                title: {
                    enable: true,
                    text: "Flight delays"
                }
            };
            console.log(this.flightDelays);
            
            this.flightDelayData = [
                {
                    "key": "Quantity",
                    "values": this.flightDelays
                }];
            this.flightDelaysAvalible = true;
        }
    }

    configureCorrelationGraph() {
        this.$log.info(this.recommendedFlights);
        if (this.correlationPoints && !this.correlationPointsAvalibile) {
            this.correlationGraphOptions = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    x: function (d) { return d.x; },
                    y: function (d) { return d.y; },
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
                        axisLabelDistance: -10
                    },
                    tooltip: {
                        keyFormatter: function (d) {
                            return d3.time.format('%x')(new Date(d));
                        }
                    }
                },
                title: {
                    enable: true,
                    text: "Correlation between delays and distances"
                }
            };
            this.correlationGraphData = [
                {
                    key: "Avarage delays in minutes",
                    values: this.correlationPoints
                }
            ];
            this.correlationPointsAvalibile = true;
        }
    }

    $doCheck() {

       this.configureCorrelationGraph();
       this.configureFlightDelaysGraph();
    }

    mapStateToThis(state) {
        return {
            selectedFlight: selectFlight(state),
            correlationPoints: getCorrelationPoints(state),
            recommendedFlights: recommendFlights(state),
            overallDelayRatio: getOverallDelaysRatio(state),
            flightDelays: getFlightDelays(state)
        }
    }
}

export default FlightDetailsCtrl;