import d3 from 'd3/d3';
import * as actions from '../../../actions';
import * as moment from 'moment';
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
        this.$state = $state;

        let unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.correlationPointsAvalibile = false;
        this.flightDelaysAvalible = false;
        this.dataType = 'minute';
    }

    $onInit() {
        if(this.selectFlight) {
            this.selectFlight(this.origin, this.dest);
        }
    }

    

    

    configureCorrelationGraph() {
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

    configureFlightDelaysGraph() {

        if (this.flightDelays && !this.flightDelaysAvalible) {
            this.updateFlightDelayChart({
                data: this.flightDelays,
                title: 'Flight delays',
                xAxisLabel: 'Flight date',
                yAxisLabel: 'Flight delay in minutes',
                xTickFormat: d => d3.time.format('%x')(new Date(d)),
                yTickFormat: d => d,
                x:  d => d.date ,
                y:  d => d.delay 
            }); 
            this.flightDelaysAvalible = true;
        }
    }

    changeDataType(data) {        
        if(!this.date) {
            if(this.dataType === 'ratio') {
                this.updateFlightDelayChart({
                    data: data,
                    title: 'Flight delays',
                    xAxisLabel: 'Flight date',
                    yAxisLabel: 'Flight delays ratio',
                    xTickFormat: d => d3.time.format('%x')(new Date(d)),
                    yTickFormat: d => d3.format('.0f')(d) + '%',
                    x: d => d.date,
                    y: d => (d.delay / d.elapsedTime) * 100
                });      
            } else {
                this.updateFlightDelayChart({
                    data: data,
                    title: 'Flight delays',
                    xAxisLabel: 'Flight date',
                    yAxisLabel: 'Flight delay in minutes',
                    xTickFormat: d => d3.time.format('%x')(new Date(d)),
                    yTickFormat: d => d,
                    x:  d => d.date ,
                    y:  d => d.delay 
                });      
            }
            return ;
        }

        if(this.dataType === 'ratio') {
            this.updateFlightDelayChart({
                data: data,
                title: 'Flight delays',
                xAxisLabel: 'Flight time',
                yAxisLabel: 'Flight delays ratio',
                xTickFormat: d => d,
                yTickFormat: d => d3.format('.0f')(d) + '%',
                x: d => `${d.departureTime} to ${d.arrivalTime}`,
                y: d => (d.delay / d.elapsedTime) * 100
            });      
        } else {
            this.updateFlightDelayChart({
                data: data,
                title: 'Flight delays',
                xAxisLabel: 'Flight time',
                yAxisLabel: 'Flight delay in minutes',
                xTickFormat: d => d,
                yTickFormat: d => d,
                x: d => `${d.departureTime} -> ${d.arrivalTime}`,
                y: d => d.delay
            });      
        }
    }

    updateFlightDelayChart(options) {
        let {title, xAxisLabel, yAxisLabel, x, y, data, xTickFormat, yTickFormat} = options;
        this.flightDelayOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 100,
                    left: 50
                },
                x: x,
                y: y,
                showValues: false,
                duration: 300,
                xAxis: {
                    axisLabel: xAxisLabel,
                    rotateLabels: 30,
                    showMaxMin: false,
                    tickFormat: xTickFormat
                },
                yAxis: {
                    axisLabel: yAxisLabel,
                    axisLabelDistance: -10,
                    tickFormat: yTickFormat
                }
            },
            title: {
                enable: true,
                text: title
            }
        };

        this.flightDelayData = [
            {
                "key": "Quantity",
                "values": data
            }];
    }

    $doCheck() {        
       this.configureCorrelationGraph();
       this.configureFlightDelaysGraph();
    }
    
    changeDate() {
        if(this.date) {
            let selectedDate = moment(this.date).format('MM-DD-YYYY');    
            let selectedFlightDelays = this.flightDelays.filter(flight => moment(flight.date).format('MM-DD-YYYY') === selectedDate);
            this.changeDataType(selectedFlightDelays);   
        }
    }

    backToDashboard() {
        this.$state.go('app.dashboard');
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