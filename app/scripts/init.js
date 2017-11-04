'use strict';


angular
  .module('flightArrivalApp')
  .run(['CsvModel', '$rootScope', '$mdToast', function(CsvModel, $rootScope, $mdToast) {
  	  $rootScope.ready = false;
  	  $rootScope.showSimpleToast = function(text, delay) {
  	  	if(!delay) {
  	  		delay = 3000;
  	  	}
	    var pinTo =  {
	      bottom: false,
	      top: true,
	      left: false,
	      right: true
	    };

	    $mdToast.show(
	      $mdToast.simple()
	        .textContent(text)
	        .position(pinTo )
	        .hideDelay(delay)
	    );
	  };
      CsvModel.readCsvFile().then(function() {
      	$rootScope.ready = true;
      }, function(err) {
      	console.log(err);
      });
}]);
