angular.module('loginPage', ['ngMaterial', 'ngMessages'])
  .controller('loginPageCtrl', ['$scope', '$mdDialog', '$http', function ($scope, $mdDialog, $http) {
    /**
     * Функция, скрывающая диалог
     */
    $scope.hide = function () {
      $mdDialog.hide();
    };

    /**
     * Функция, закрывающая диаог
     */
    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    /**
     * Функция, возвращающая значение в родительский $scope
     * @param {Object} answer - возвращаемый объект
     */
    $scope.answer = function (answer) {
      $scope.login = null;
      $scope.pass = null;
      $mdDialog.hide(answer);
    };

    var validAuth = function () {
      $scope.notValid = false;
    };

    $scope.$watch('login', validAuth);
    $scope.$watch('pass', validAuth);

    /**
     * Проверяем введённый логин и пароль
     */
    $scope.processLogin = function () {
      if ($scope.login && $scope.pass) {
        var auth = $http.post('http://127.0.0.1:8081/CRM/checkAuth', {login: $scope.login, pass: $scope.pass});
        auth.success(function(data) {
          if (data) {
            $scope.answer(data);
          } else {
            $scope.notValid = true;
          }
          });
      }
    };
  }]);