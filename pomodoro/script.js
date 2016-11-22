var app = angular.module('Pomodoro', ['ngMaterial']);
app.controller('pCtrl', function($scope, $interval){
  $scope.sessionLength = 25;
  $scope.timerLength = 0;
  $scope.count = 0; 
  $scope.stop = false;
  $scope.running = false;
  $scope.progress = 0;
  $scope.breakLength = 5;
  $scope.isBreak = false;
  var t;
  var b;
  $scope.alert = function() {
    var m = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    m.play();
  }
  
  $scope.decrement = function() {
    if($scope.stop == false) {
      if($scope.count != 0) {
        $scope.progress = (($scope.timerLength * 60) - $scope.count) / ($scope.timerLength*0.6);
        $scope.count = $scope.count - 1;
      } else {
        $scope.alert();
        $interval.cancel(t);
        $interval.cancel(b);
        if($scope.isBreak == true) {
          $scope.startTimer();
        } else {
          $scope.startBreak();
        }
      }
    }
  };
  
  $scope.startBreak = function() {
    $interval.cancel(t);
    $scope.running = true;
    $scope.stop = false;
    $scope.isBreak = true;
    $scope.timerLength = $scope.breakLength;
    $scope.count = $scope.breakLength*60;
    b = $interval(function() {
      $scope.decrement();
    }, 1000);
  };
  
  $scope.startTimer = function() {
    if($scope.isBreak == true) {
      $interval.cancel(b);
      $scope.isBreak = false;
    }
    $scope.running = true;
    $scope.stop = false;
    $scope.timerLength = $scope.sessionLength;
    $scope.count = $scope.sessionLength*60;
    t = $interval(function() {
      $scope.decrement();
  },1000);
  };
  
  $scope.start = function() {
    $scope.running = true;
    $scope.stop = false;
    if($scope.isBreak == false) {
      t = $interval(function() {
        $scope.decrement();
    },1000);
    } else {
      b = $interval(function() {
        $scope.decrement();
    },1000);
    }
  };
  
  $scope.stopTimer = function() {
    $scope.running = false;
    $scope.stop = true;
    $interval.cancel(t);
  };
  
  $scope.pause = function() {
    $scope.stop = true;
    $interval.cancel(t);
  };
  
  $scope.updateB = function(c) {
    if (c == 'n' && $scope.breakLength != 1) {
      $scope.breakLength -= 1;
    }
    else if (c == 'p' && $scope.breakLength != 20) {
      $scope.breakLength += 1;
    }
  };
  
  $scope.update = function(c) {
    if (c == 'n' && $scope.sessionLength != 1) {
      $scope.sessionLength -= 1;
    }
    else if (c == 'p' && $scope.sessionLength != 90) {
      $scope.sessionLength += 1;
    }
  };
  
  $scope.plusOne = function() {
    $scope.timerLength += 1;
    $scope.count += 60;
  };
  
  $scope.reset = function() {
    $scope.stopTimer();
  };
  
});

app.filter('Time', function() {
  return function(seconds) {
    var minutes = 0;
    minutes = Math.floor(seconds / 60);
    seconds = (seconds % 60) ;
    return minutes + " : " + seconds;
  }
});
