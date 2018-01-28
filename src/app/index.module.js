'use strict';

import config from './index.config';
import run from './index.run';

import uiRouter from '@uirouter/angularjs';
import indexRoute from './index.route';
import dashboard from './dashboard';
import flightDetails from './flight-details';
import ngRedux from 'ng-redux';


const App = angular.module(
  "flight-arrivals", [
    // plugins
    uiRouter,
    "ngAnimate", 
	"ngCookies", 
	"ngTouch", 
	"ngSanitize", 
	"ngMessages", 
	"ngAria", 
  "ngResource",
  indexRoute.name,
  dashboard.name,
  flightDetails.name,
  'ui.bootstrap',
  ngRedux,
  'angucomplete-alt',
  'nvd3'
  ]
);

App
  .config(config)
  .run(run);



export default App;
