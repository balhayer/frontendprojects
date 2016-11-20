var app = angular.module('WeatherApp', ['ngMaterial']);
app.controller('WeatherControl', function($scope, $http) {
  $scope.icons = { 
    'clear-day': 'https://ssl.gstatic.com/onebox/weather/128/sunny.png', 
    'clear-night': 'https://ssl.gstatic.com/onebox/weather/128/sunny.png', 
    'rain': 'https://ssl.gstatic.com/onebox/weather/128/rain_light.png', 
    'snow': 'https://ssl.gstatic.com/onebox/weather/128/snow.png',
    'wind': 'https://ssl.gstatic.com/onebox/weather/128/windy.png', 
    'fog': 'https://ssl.gstatic.com/onebox/weather/128/fog.png', 
    'cloudy': 'https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png', 
    'partly-cloudy-day': 'https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png', 
    'partly-cloudy-night': 'https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png',
    'hail': '', 
    'thunderstorm': 'https://ssl.gstatic.com/onebox/weather/128/thunderstorms.png'};
  $scope.unit = 'C';
  $scope.hide = false;
  $scope.lat = '';
  $scope.long = '';
  $scope.weather = [];
  $scope.loc = [];
  $scope.forecast = {};
  $scope.getPos = function(pos) {
    $scope.lat = Math.round(pos.coords.latitude * 1000) / 1000;
    $scope.long = Math.round(pos.coords.longitude * 1000) / 1000;
    $scope.getData();
  };

  $scope.getLocName = function() {
     $http({
       method: 'GET',
       url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + $scope.lat + '&lon=' + $scope.long + '&zoom=18&addressdetails=1'
     }).then(function successCallback(response) {
       $scope.loc = response.data.address;
       $scope.hide = true;
     }, function errorCallback(response) {
     });
  };
  
  $scope.getData = function() {
    this.url = 'https://api.darksky.net/forecast/f51a4bcafaed4fccdfec1827839ce09a/' + $scope.lat + ',' + $scope.long + '?callback=JSON_CALLBACK';
    $http.jsonp(this.url).success(function(data) {
      $scope.weather = data;
      $scope.getLocName();
    });
  };
  
  navigator.geolocation.getCurrentPosition($scope.getPos);
});

app.filter('temp', function() {
  return function (t, unit) {
    if(unit == 'C') {
      return Math.round((t - 32) * 0.5556 * 100) / 100;
    }
    else if(unit == 'F') {
      return t;
    }
  };
});
