angular.module('loginPage', ['ngMaterial', 'ngMessages'])
  .controller('loginPageCtrl', function($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.login = '';
    $scope.pass = '';

    $scope.processLogin = function () {
      if ($scope.login !== '' && $scope.pass !== '') {
        $scope.cancel();
      }
    }
  });