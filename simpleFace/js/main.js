angular.module('CRM', ['ngMaterial', 'ngMessages', 'loginPage'])
  .controller('main', ['$scope', '$mdDialog', '$mdMedia',
    function ($scope, $mdDialog, $mdMedia) {
      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      /**
       * Функция для отображения диалога логина
       * @param ev - event
       */
      $scope.showLoginDialog = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
            controller: 'loginPageCtrl',
            templateUrl: 'templates/loginPage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function (answer) {
            $scope.login = answer;
          });


        $scope.$watch(function () {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
          $scope.customFullscreen = wantsFullScreen === true;
        });

      };

    }]);