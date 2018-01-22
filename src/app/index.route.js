import mainHtmlTemplate from './main.html';

function routeConfig($urlRouterProvider, $stateProvider) {
    'ngInject';
  
      $stateProvider
          .state('app', {
            url: '/',
            abstract: true,
            templateUrl: mainHtmlTemplate
          });
  
    $urlRouterProvider.otherwise('/dashboard');
  
  }
  
  export default angular
    .module('index.routes', [])
      .config(routeConfig);