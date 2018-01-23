import dashboardTemplate from './dashboard.html';
import dashboardCtrl from './dashboard-ctrl';
import popupComponentModule from '../popup';

let dashboardComponentModule = angular.module('dashboard.component', [popupComponentModule.name]);

dashboardComponentModule.component('dashboard', {
    templateUrl: dashboardTemplate,
    controller: dashboardCtrl
});

export default dashboardComponentModule;