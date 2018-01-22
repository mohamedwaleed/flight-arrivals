import dashboardTemplate from './dashboard.html';
import dashboardCtrl from './dashboard-ctrl';

let dashboardComponentModule = angular.module('dashboard.component', []);

dashboardComponentModule.component('dashboard', {
    templateUrl: dashboardTemplate,
    controller: dashboardCtrl
});

export default dashboardComponentModule;