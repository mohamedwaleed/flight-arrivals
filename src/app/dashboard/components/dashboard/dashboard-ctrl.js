
class DashboardCtrl {
   constructor($document, $log) {
    'ngInject';
    this.$document = $document;
    this.$log = $log;
   } 

   openPopup() {
    let element = this.$document[0].getElementById('modal');
    this.$log.info(element.style.display);
    if(element.style.display === 'none') {
        element.style.display = 'block';
        document.body.style.backgroundColor = '#666';
    }else {
        element.style.display = 'none';
        this.$document[0].body.style.backgroundColor = '#fff';
    }
   }
}

export default DashboardCtrl;