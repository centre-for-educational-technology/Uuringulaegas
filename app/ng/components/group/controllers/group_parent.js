'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupParentCtrl
 * @description
 * # GroupParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupParentCtrl', function (appConfig, $scope, $rootScope, $cookies) {


    var mainHelpCookie = $cookies.showGroupsHelp;
    if(mainHelpCookie == 1){
      $scope.helpCollapsed = false;
    } else {
      $scope.helpCollapsed = true;
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
