
class DashboardCtrl {
    constructor($document, $log, $ngRedux, $state, flightService) {
        'ngInject';
        this.$document = $document;
        this.$log = $log;
        this.selectedOrigin = "";
        this.selectedDestination = "";
        this.searchFlights = this.searchFlights.bind(this);
        this.$state = $state;
        this.flightService = flightService;
        this.mapStateToThis = this.mapStateToThis.bind(this);
        $ngRedux.connect(this.mapStateToThis)(this);
    }


    searchFlights(searchedFlight){
         return this.flights.filter(flight => flight.name.toLowerCase().includes(searchedFlight.toLowerCase()));
    }

    showFlightDetails() {
        if(!this.selectedOrigin || this.selectedOrigin === "") {
            return;
        }
        if(!this.selectedDestination || this.selectedDestination === "") {
            return;
        }
        this.$state.go('app.flight-details', {origin: this.selectedOrigin.title, destination: this.selectedDestination.title});
    }

    mapStateToThis(state) {
        return {
            flights: this.flightService.getFlightsStates(state.flights)
        };
    }
   
}

export default DashboardCtrl;