
const config = $stateProvider => {
    'ngInject';
    $stateProvider.state('app.dashboard', {
        url: 'dashboard',
        component: 'dashboard'
    });
}

export default config;
