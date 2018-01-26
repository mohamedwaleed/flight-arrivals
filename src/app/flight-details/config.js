
const config = $stateProvider => {
    'ngInject';
    $stateProvider.state('app.flight-details', {
        url: 'flight-details',
        component: 'flightdetails',
        params: {
            origin: null,
            destination: null
        }
    });
}

export default config;
