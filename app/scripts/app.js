'use strict';

 /*jshint unused:false*/

var services = angular.module('services', []);

var controllers = angular.module('controllers', ['services']);

var app = angular
  .module('flightArrivalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'chart.js',
    'ui.router',
    'ngMaterial',
    'htmlToPdfSave',
    'controllers',
    'services'
  ]);
