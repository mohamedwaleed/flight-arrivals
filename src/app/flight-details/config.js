
const config = $stateProvider => {
    'ngInject';
    $stateProvider.state('app.flight-details', {
        url: 'flight-details',
        component: 'flight-details'
    });
}

export default config;
