'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('flightArrivalApp'));

  var DashboardCtrl,
    scope, $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      $state: _$state_
    });
    $state = _$state_;
  }));

  it('should invoke searchFlights method', function () {
    scope.origin = 'MIA';
    scope.dest = 'SAN';
    spyOn($state, 'go');
    scope.searchFlights();
    expect($state.go).toHaveBeenCalledWith('app.analytics', {origin: scope.origin, dest: scope.dest});
  });

  it('should capitalize origin and destination', function () {
    scope.origin = 'mia';
    scope.dest = 'san';
    scope.searchFlights();
    expect(scope.origin).toBe('MIA');
    expect(scope.dest).toBe('SAN');
  });
});
