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

    $rootScope.developerView = true; // Set to 'true' to see hidden raw data

    $scope.userLoaded = false;

    $.get('ng/langStrings.json', function(data){
      $rootScope.langStrings = data;
      //console.log(data);
      //console.log(data);
    });

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
