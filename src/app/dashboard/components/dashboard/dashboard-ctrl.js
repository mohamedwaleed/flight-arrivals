
class DashboardCtrl {
   constructor($document, $log) {
    'ngInject';
    this.$document = $document;
    this.$log = $log;
   } 

   openPopup() {
    let element = this.$document[0].getElementById('modal');
    this.$log.info(element.style.display);
    if(element.style.display === 'none' || !element.style.display) {
        element.style.display = 'block';
        element.style.backgroundColor = 'rgba(0,0,0,0.4)';
    }else {
        element.style.display = 'none';
        element.style.backgroundColor = 'rgba(0,0,0,0)';
    }
   }

   closePopup() {
    let element = this.$document[0].getElementById('modal');
    this.$log.info(element.style.display);
    if(element.style.display === 'none' || !element.style.display) {
        element.style.display = 'block';
        element.style.backgroundColor = 'rgba(0,0,0,0.4)';
    }else {
        element.style.display = 'none';
        element.style.backgroundColor = 'rgba(0,0,0,0)';
    }
   }
}

export default DashboardCtrl;