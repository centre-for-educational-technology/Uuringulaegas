'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupParentCtrl
 * @description
 * # GroupParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupParentCtrl', function (appConfig, $scope, $stateParams, GroupService, $rootScope, $cookies) {

    GroupService.get({id: $stateParams.id}, function(success) {
      for (var t = 0; t < success.teachers.length; t++) {
        if (parseInt(success.teachers[t].ID) == $rootScope.currentUserData.userID) {
          $scope.allowedToEdit = true;
        }
      }
    });

    GroupService.getGroupsBackgroundImage(function(data) {
      if ( data.url ) {
        $scope.groupsBackgroundImage = data.url;
      } else {
        $scope.groupsBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/main.jpg';
      }
    });

    var mainHelpCookie = $cookies.showGroupsHelp;
    if(mainHelpCookie == 0){
      $scope.helpCollapsed = true;
    } else {
      $scope.helpCollapsed = false;
    }

    $scope.toggleMainHelp = function () {
      if($scope.helpCollapsed){
        $cookies.showGroupsHelp = 1;
        $scope.helpCollapsed = false;
      } else {
        $cookies.showGroupsHelp = 0;
        $scope.helpCollapsed = true;
      }
    };

  });
