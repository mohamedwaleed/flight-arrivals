import uiRouter from '@uirouter/angularjs';
import dashboardConfig from './config';
import dashboardComponentModule from './components/dashboard';
import popupComponentModule from './components/popup';

const dashboardModule = angular.module('dashboard', [
    uiRouter,
    dashboardComponentModule.name,
    popupComponentModule.name
]);

dashboardModule.config(dashboardConfig);

export default dashboardModule;