'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupParentCtrl
 * @description
 * # GroupParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupParentCtrl', function (appConfig, $scope, $stateParams, GroupService) {

    GroupService.getGroupsBackgroundImage(function(data) {
      if ( data.url ) {
        $scope.groupsBackgroundImage = data.url;
      } else {
        $scope.groupsBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/main.jpg';
      }
    });

  });
