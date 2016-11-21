var app = angular.module('WikiApp', ['ngMaterial']);
app.controller('WikiCtrl', function($scope, $http) {
  $scope.showSearch = false;
  $scope.form = $('#sf');
  $scope.res = $('#res');
  $scope.query = '';
  $scope.result = [];
  $scope.geturl = '';
  $scope.go = function() {
    this.geturl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&callback=JSON_CALLBACK&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + this.query;
    angular.element($('#res')).html('');
    $http.jsonp(this.geturl).success(function(data) {
      this.result = data.query.pages;
      angular.forEach(this.result, function(item, k) {
       
        $scope.h =  "<a class='md-list-item-text' target='_blank' href='http://en.wikipedia.org/?curid="+ item.pageid +"'><h3>"+item.title + "</h3><p>" + item.extract +"</p></a>" ;
        $scope.tag = document.createElement('md-list-item');
        $scope.tag.innerHTML = $scope.h;
        angular.element($('#res')).append($scope.tag);

      });
    });
  };
});
