'use strict';

/* globals app */

app.run(['CsvModel', '$rootScope', '$log', function(CsvModel, $rootScope, $log) {
  	  $rootScope.ready = false;
      CsvModel.readCsvFile().then(function() {
      	$rootScope.ready = true;
      }, function(err) {
      	$log.info(err);
      });
}]);
