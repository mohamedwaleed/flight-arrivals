import mainHtmlTemplate from './main.html';
import MainCtrl from './main-ctrl';

function routeConfig($urlRouterProvider, $stateProvider) {
    'ngInject';
  
      $stateProvider
          .state('app', {
            url: '/',
            abstract: true,
            templateUrl: mainHtmlTemplate,
            controller: MainCtrl
          });
  
    $urlRouterProvider.otherwise('/dashboard');
  
  }
  
  export default angular
    .module('index.routes', [])
      .config(routeConfig);