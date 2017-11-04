'use strict';
angular
.module('flightArrivalApp')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
        abstract: true,
        url: '/',
        templateUrl: 'views/main.html'
    })
    .state('app.dashboard', {
        url: 'dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
    })
    .state('app.analytics', {
        url: 'analytics',
        templateUrl: 'views/analytics.html',
        controller: 'AnalyticsCtrl',
        params: { origin: null, dest: null}
    });
  $urlRouterProvider.otherwise('/dashboard');
}]);
