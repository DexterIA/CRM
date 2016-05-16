angular.module('loginPage', ['ngMaterial', 'ngMessages'])
  .controller('loginPageCtrl', function($scope, $mdDialog) {
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
      $mdDialog.hide(answer);
    };

    $scope.login = '';
    $scope.pass = '';

    /**
     * Проверяем введённый логин и пароль
     */
    $scope.processLogin = function () {
      if ($scope.login !== '' && $scope.pass !== '') {
        $scope.cancel();
      }
    };
  });