import uiRouter from '@uirouter/angularjs';
import dashboardConfig from './config';
import dashboardComponentModule from './components/dashboard';

const dashboardModule = angular.module('dashboard', [
    uiRouter,
    dashboardComponentModule.name
]);

dashboardModule.config(dashboardConfig);

export default dashboardModule;