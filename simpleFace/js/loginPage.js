angular.module('loginPage', ['ngMaterial', 'ngMessages', 'ngResource'])
  .controller('loginPageCtrl', ['$scope', '$mdDialog', '$resource', function($scope, $mdDialog, $resource) {
    /**
     * Функция, скрывающая диалог
     */
    $scope.hide = function() {
      $mdDialog.hide();
    };

    /**
     * Функция, закрывающая диаог
     */
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    /**
     * Функция, возвращающая значение в родительский $scope
     * @param {Object} answer - возвращаемый объект
     */
    $scope.answer = function(answer) {
      $scope.login = '';
      $scope.pass = '';
      $mdDialog.hide(answer);
    };

    $scope.login = '';
    $scope.pass = '';

    /**
     * Проверяем введённый логин и пароль
     */
    $scope.processLogin = function () {
      if ($scope.login !== '' && $scope.pass !== '') {
        debugger;
        var auth = $resource('http://127.0.0.1:8081/CRM/checkAuth', {}, {
          check: { method: 'POST' }
        });
        auth.check({login: $scope.login, pass: $scope.pass}, function (data) {
          if (data) {
            alert('yes!');
          }
        });
      }
    };
  }]);