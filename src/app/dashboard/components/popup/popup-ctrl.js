import flightsService from '../../../flight/services/flights-service';

export default class PopupController { 
    constructor($document, popupService, $log, $ngRedux) {
        'ngInject';
        this.$document = $document;
        this.popupService = popupService;
        this.$log = $log;
        this.selectedOrigin = "";
        this.selectedDestination = "";
        this.searchFlights = this.searchFlights.bind(this);
        $ngRedux.connect(this.mapStateToThis)(this);
    }

    closePopup() {
        this.popupService.open();
    }

    searchFlights(searchedFlight){
         return this.flights.filter(flight => flight.name.toLowerCase().includes(searchedFlight.toLowerCase()));
    }

    mapStateToThis(state) {
        return {
            flights: flightsService.getFlightsStates(state.flights)
        };
    }
}