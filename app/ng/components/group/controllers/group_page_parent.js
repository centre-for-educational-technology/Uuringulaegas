'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupParentCtrl
 * @description
 * # GroupParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupParentCtrl', function (appConfig, $scope, $stateParams, GroupService, $rootScope) {

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

  });
