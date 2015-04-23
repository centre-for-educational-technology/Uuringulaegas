'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('MainCtrl', function ($rootScope, LoginService, $route, $scope) {

    //getLoggedInUser(); // First page load

    $scope.userLoaded = false;

    $scope.$on('$locationChangeStart', function(event) {
      getLoggedInUser();
    });

    function getLoggedInUser(){
      LoginService.getLoggedInUser('', function(data){
        // Success
        $rootScope.loggedIn = true;
        $rootScope.currentUserData = data;
        $scope.userLoaded = true;
      }, function(error){
        // Error (not logged in)
        $rootScope.loggedIn = false;
        $scope.userLoaded = true;
      });
    }

  });