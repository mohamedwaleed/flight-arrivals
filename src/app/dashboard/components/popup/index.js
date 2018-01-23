import popupTemplate from './popup.html';
import popupCtrl from './popup-ctrl';
import popupService from './popup-service';
import "./css/popup.css";
import "./css/animate.css";

let popupComponentModule = angular.module('popup.component', []);

popupComponentModule.component('popup', {
    templateUrl: popupTemplate,
    controller: popupCtrl
});

popupComponentModule.service('popupService', popupService)
;
export default popupComponentModule;