'use strict';

/* globals app */

app.run(['CsvModel', '$rootScope', '$mdToast', '$log', function(CsvModel, $rootScope, $mdToast, $log) {
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
      	$log.info(err);
      });
}]);
