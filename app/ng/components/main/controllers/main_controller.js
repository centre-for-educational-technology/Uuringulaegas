'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('MainCtrl', function ($rootScope, LoginService, $route, $scope, $state) {

    $rootScope.developerView = true; // Set to 'true' to see hidden raw data

    $rootScope.userLoaded = false;

    $.get('ng/langStrings.json', function(data){
      $rootScope.langStrings = data;
    });

    $scope.$on('$locationChangeStart', function(event) {
      getLoggedInUser();
    });

    function getLoggedInUser(){
      LoginService.getLoggedInUser('', function(data){
        // Success
        $rootScope.loggedIn = true;
        $rootScope.currentUserData = data;
        $rootScope.userLoaded = true;

        // Redirect to complete profile, if needed
        if(!data.profileCompleted){
          $state.go('user.edit.profile', {forced: true})
        } else if (!data.extraInfoCompleted){
          $state.go('user.edit.extra', {forced: true})
        }

      }, function(error){
        // Error (not logged in)
        $rootScope.loggedIn = false;
        $rootScope.userLoaded = true;
      });
    }

  });
