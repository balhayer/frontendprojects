var app = angular.module('TicTacToe', ['ngMaterial']);
app.controller('pCtrl', function($scope, $timeout, $mdToast) {
  $scope.game = {
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: '',
    eight: '',
    nine: ''
  };
  $scope.temp = {};
  $scope.winner = false;
  $scope.win = {
    user: 0,
    com: 0
  };
  $scope.user = 'X';
  $scope.com = 'O';
  $scope.turn = true;
  $scope.hide = false;
  $scope.isWon = function(t) {
    if (t.one == t.two && t.two == t.three && t.three != '') {
      return t.one;
    } else if (t.one == t.four && t.four == t.seven && t.seven != '') {
      return t.one;
    } else if (t.one == t.five && t.five == t.nine && t.nine != '') {
      return t.one;
    } else if (t.two == t.five && t.five == t.eight && t.eight != '') {
      return t.two;
    } else if (t.three == t.five && t.five == t.seven && t.seven != '') {
      return t.three;
    } else if (t.three == t.six && t.six == t.nine && t.nine != '') {
      return t.three;
    } else if (t.four == t.five && t.five == t.six && t.six != '') {
      return t.four;
    } else if (t.seven == t.eight && t.eight == t.nine && t.nine != '') {
      return t.seven;
    } else {
      return false;
    }
  };
  $scope.winPossib = function(test, p) {
    angular.copy($scope.game, $scope.temp);
    if (p == 'com') {   
      $scope.temp[test] = $scope.com;
      if ($scope.isWon($scope.temp) != false) {
        return true;
      } else {
        return false;
      }
    } 
    else if (p == 'user') {
      $scope.temp[test] = $scope.user;
      if ($scope.isWon($scope.temp) != false) {
        return true;
      } else {
        return false;
      }
    }
    $scope.temp = {};
  };
  
  $scope.getMove = function() {
    var ran = [];
    for(var tic in $scope.game) {
      if ($scope.game[tic] == '' && $scope.turn == false) {
        if ($scope.winPossib(tic, 'com') == true) {
          $scope.game[tic] = $scope.com;
          $scope.winner = $scope.com;
          $scope.win.com += 1;
          $scope.turn = true;
          $mdToast.show($mdToast.simple().textContent('You Lost!'));
          $timeout(function() {$scope.nextgame();}, 1000);
        } else if ($scope.winPossib(tic, 'user') == true) {
          $scope.game[tic] = $scope.com;
          $scope.turn = true;
        } else {
          ran.push(tic);  
        }
      }
    }
    if($scope.turn == false && $scope.winner == '') {
      $scope.turn = true;
      var r = ran[Math.floor(Math.random()*ran.length)];
      $scope.game[r] = $scope.com;
      if($scope.isDraw() == true) {
        $mdToast.show($mdToast.simple().textContent('Its a Draw!'));
        $timeout(function() {$scope.nextgame();}, 1000);
      }
    }
  };
  
  $scope.pMove = function($event) {
    if ($scope.winner == false && $scope.turn == true) {
      $scope.turn = false;
      if ($event.target.innerText === '') {
        $scope.class = $($event.target).attr("class").split(' ')[0];
        $scope.game[$scope.class] = $scope.user;
        $scope.winner = $scope.isWon($scope.game);
        if( $scope.winner == false ) {
          if($scope.isDraw() == false ) {
            $timeout(function() { $scope.getMove();}, 1000);
          } 
          else {
            $mdToast.show($mdToast.simple().textContent('Its a Draw!'));
            $timeout(function() {$scope.nextgame();}, 1000);
          } 
        }
        else if ( $scope.winner == $scope.user ) {
          $mdToast.show($mdToast.simple().textContent('You Won!'));
          $scope.win.user += 1;
          $timeout(function() {$scope.nextgame();}, 1000);
        }
      }
    }
  };
 
  $scope.set = function() {
    if ($scope.user == 'X') {
      $scope.com = 'O';
      $scope.turn = true;
    } else {
      $scope.com = 'X';
      $scope.turn = false;
      $scope.getMove();
    }
  };
  $scope.reset = function() {
    for (var keys in $scope.game) {
      $scope.game[keys] = '';
    }
    $scope.winner = false;
    $scope.hide = false;
    $scope.user = '';
    $scope.com = '';
    $scope.turn = true;
    $scope.win.user = 0;
    $scope.win.com = 0;
    $mdToast.show($mdToast.simple().textContent('Lets start a new game!'));
  };
  $scope.nextgame = function() {
    for (var keys in $scope.game) {
      $scope.game[keys] = '';
    }
    $scope.winner = false;
    if($scope.user == 'X') {
      $scope.turn = true;
    }
    else {
      $scope.turn = false;
      $scope.getMove()
    }
  };
  
  $scope.isDraw = function() {
    for( var keys in $scope.game) {
      if($scope.game[keys] === '') {
        return false;
      }
      else {
        continue;
      }
    }
    return true;
  };
});
