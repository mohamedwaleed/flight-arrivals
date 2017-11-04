'use strict';


angular
  .module('flightArrivalApp')
  .service('CsvService', ['$http', 'BASE_URL' ,
    function ($http, BASE_URL) {
	    return  {
	    	getFlights: function() {
	    		return $http({
			    	url: BASE_URL + 'Flight-Delays.csv',
			    	method: 'GET'
			    });
	    	}
	    };
}]);
