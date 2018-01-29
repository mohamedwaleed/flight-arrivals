import popupTemplate from './popup.html';
import popupCtrl from './popup-ctrl';
import popupService from './popup-service';
import './css/popup.css';
import './css/animate.css';
import fligtModule from '../../../flight';

let popupComponentModule = angular.module('popup.component', [fligtModule.name]);

popupComponentModule.component('popup', {
    templateUrl: popupTemplate,
    controller: popupCtrl
});

popupComponentModule.service('popupService', popupService)
;
export default popupComponentModule;