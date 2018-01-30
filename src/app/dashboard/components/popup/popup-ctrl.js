
export default class PopupController { 
    constructor($document, popupService, $log, $ngRedux, $state, flightService) {
        'ngInject';
        this.$document = $document;
        this.popupService = popupService;
        this.$log = $log;
        this.selectedOrigin = "";
        this.selectedDestination = "";
        this.searchFlights = this.searchFlights.bind(this);
        this.$state = $state;
        this.flightService = flightService;
        this.mapStateToThis = this.mapStateToThis.bind(this);
        $ngRedux.connect(this.mapStateToThis)(this);
    }

    closePopup() {
        this.popupService.open();
    }

    searchFlights(searchedFlight){
         return this.flights.filter(flight => flight.name.toLowerCase().includes(searchedFlight.toLowerCase()));
    }

    showFlightDetails() {
        if(!this.selectedOrigin || this.selectedOrigin === "") {
            // form.origin.$setValidity('autocomplete-required', true);
            return;
        }
        if(!this.selectedDestination || this.selectedDestination === "") {
            // form.destination.$setValidity('autocomplete-required', true);
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