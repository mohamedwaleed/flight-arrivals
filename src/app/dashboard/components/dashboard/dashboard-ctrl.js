
class DashboardCtrl {
   constructor($document, $log, popupService) {
    'ngInject';
    this.$document = $document;
    this.$log = $log;
    this.popupService = popupService;
   } 

   gettingStarted() {
        this.popupService.open();
   }

   
}

export default DashboardCtrl;