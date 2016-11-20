var app = angular.module('Simon', ['ngMaterial']);

app.controller('gameCtrl', function($scope, $timeout) {
  $scope.colors = ["g", "r", "b", "y"];
  var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  audio1.load();
  var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  audio2.load();
  var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  audio3.load();
  var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  audio4.load();
  $scope.sequence = "";
  $scope.seq = "";
  $scope.turn = true;
  $scope.strict = false;
  $scope.count = 0;
  $scope.stat = '';
  $scope.putCount = 0;
  $scope.flag = false;
  $scope.message = "Let's start a new game";
  var sc = 0;
  
  $scope.won = function() {
    $scope.message = "You've Won!\n Let's start a new game!"
    $scope.hide = false;
    $scope.reset();
  };
  
  $scope.genSeq = function() {
    if($scope.count < 20) {
      $scope.count++;
      $scope.sequence += $scope.colors[Math.floor(Math.random() * ($scope.colors.length))];
      $scope.showSeq();
    } else {
      $scope.won();
    }
  };
  
  $scope.reset = function() {
    $scope.sequence = "";
    $scope.seq = "";
    $scope.count = 0;
    $scope.turn = true;
    $scope.putCount = 0;
    $scope.flag = false;
    $scope.strict = false;
  };
  
  $scope.check = function() {
    if ($scope.sequence.indexOf($scope.seq) == 0) {
      return true;
    }
  };
  
  $scope.alert = function() {
    $scope.Alert = {'border': '12px solid #E53935'};
    $timeout(function() {
      $scope.Alert = {'border': '12px solid #424242'};
    }, 750, 1);
  }
  
  $scope.playSound = function(v) {
    switch (v) {
      case 'g': 
        audio1.play(); 
        break;
      case 'r': 
        audio2.play();
        break;
      case 'b':
        audio3.play();
        break;
      case 'y':
        audio4.play();
        break;
     }
  };
  
  $scope.Off = function() {
    $scope.stat = '';
    sc++;
    $timeout(function() {
      $scope.showSeq();
    }, 300, 1);
  };
  
  $scope.On = function(col) {
    $scope.stat = col + 'on';
    $scope.playSound(col);
    $timeout(function() {
      $scope.Off();
    }, 700, 1);
  }; 
  
  $scope.showSeq = function() {
    $scope.arr = $scope.sequence.split('');
    if(sc < $scope.arr.length) {
      $scope.On($scope.arr[sc]);
    } else {
      sc = 0;
      $scope.turn = true;
      $scope.putCount = 0;
    }
  };
  
  $scope.put = function(c) {
    if($scope.turn == true) { 
      if($scope.putCount < $scope.count - 1) {
        $scope.putCount++;
        $scope.playSound(c);        
        $scope.seq += c;
        if($scope.check() == true) {
          $scope.turn = true;
        }
        else if($scope.strict == false && $scope.flag == false) {
          $scope.turn = true;
          $scope.flag = true;
          $scope.seq = "";
          $scope.alert();
          console.log('Try again');
          $timeout(function() {
            $scope.showSeq();
          }, 1000, 1);
        }
        else {
          console.log('You lost');
          $scope.message = "You've Lost :( \nLet's start a new game!";
          $scope.hide = false;
          $scope.reset();
        }
      } 
      else {
        $scope.playSound(c);
        $scope.turn = false;
        $scope.seq += c;
        $scope.putCount = 0;
        if($scope.check() == true) {
          $scope.seq = "";
          $timeout(function() {
            $scope.genSeq();
          }, 750, 1);
        }
        else {
          $scope.turn = true;
          $scope.seq = "";
          if($scope.strict == false && $scope.flag == false) {
            $scope.flag = true;
            $timeout(function() {
              $scope.showSeq();
            }, 1000, 1);
            $scope.alert();
            console.log('Try again..');
          } else {
            // Lost
            $scope.message = "You've Lost :( \nLet's start a new game!";
            $scope.hide = false;
            $scope.reset();
          }      
        }
      }
    }
  };
  
  $scope.start = function() {
    $scope.hide = true;
    $scope.reset();
    $timeout(function() {
      $scope.genSeq();
    }, 2000, 1); 
  };
});
