import * as actions from './actions';

export default class MainCtrl {

    constructor($ngRedux, $log) {
        'ngInject';
        this.mapStateToThis = this.mapStateToThis.bind(this);
        this.$log = $log;
        $ngRedux.connect(this.mapStateToThis, actions)(this);
        this.fetchFlights();
    }

    mapStateToThis(state) {
        this.$log.info(state.flights);
        return {
            flights: state.flights,
            isLoading: (state.flights === null)
        };
    }
}