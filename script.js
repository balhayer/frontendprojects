var app = angular.module('projects', ['ngMaterial', 'ngRoute']);
  app.controller('proCtrl', function($scope) {});
  app.config(function ($routeProvider) {
    $routeProvider
    .when("/", { templateUrl : "index.html" })
    .when("/pomodoro", { templateUrl : "./pomodoro/index.html" })
    .when("/simongame", { templateUrl : "./simongame/index.html" })
    .when("/tctactoe", { templateUrl : "./tictactoe/index.html" })
    .when("/calculator", { templateUrl : "./calculator/index.html" })
    .when("/weather", { templateUrl : "./weather/index.html" })
    .when("/twitchstatus", { templateUrl : "./twitchstatus/index.html" })
    .when("/quoter", { templateUrl : "./quoter/index.html" })
    .when("/wikisearch", { templateUrl : "./wikisearch/index.html" })
    .otherwise({ templateUrl : "index.html"});
  });
