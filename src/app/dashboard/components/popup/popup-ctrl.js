
export default class PopupController { 
    constructor($document, popupService) {
        'ngInject';
        this.$document = $document;
        this.popupService = popupService;
    }

    closePopup() {
        this.popupService.open();
    }
}