
export default class PopupService {
   
   constructor($document) {
       'ngInject';
        this.$document = $document;
   }

   open() {
    let element = this.$document[0].getElementById('modal');
    if(element.style.display === 'none' || !element.style.display) {
        element.style.display = 'block';
        element.style.backgroundColor = 'rgba(0,0,0,0.4)';
    }else {
        element.style.display = 'none';
        element.style.backgroundColor = 'rgba(0,0,0,0)';
    }
   }

   close() {
    let element = this.$document[0].getElementById('modal');
    if(element.style.display === 'none' || !element.style.display) {
        element.style.display = 'block';
        element.style.backgroundColor = 'rgba(0,0,0,0.4)';
    }else {
        element.style.display = 'none';
        element.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
}