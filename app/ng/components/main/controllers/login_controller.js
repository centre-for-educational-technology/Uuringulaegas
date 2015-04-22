'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('LoginCtrl', function ($scope, $rootScope, LoginService, $location) {

    $scope.loginData = {
      remember: false,
      action: 'log_in'
    };

    $scope.login = function(){
      console.log($scope.loginData);
      $scope.updating = true;
      LoginService.login($scope.loginData, function(){
        // Success
        $scope.updating = false;
        $scope.$parent.userLoaded = false;
        showTitlePage();
      },
      function(error){
        $scope.updating = false;
        $scope.errors = error;
      })
    };

    function showTitlePage(){
      $location.path('/');
      // $scope.$apply(); // Needed (just in case) for Angular to recognize change in path
    }



  });


