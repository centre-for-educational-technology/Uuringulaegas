'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InqActParentCtrl
 * @description
 * # InqActParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityParentCtrl', function ($scope, $stateParams, InquiryActivityService, appConfig, $cookies) {
    $scope.totals = InquiryActivityService.getTotals();
    InquiryActivityService.getActivitiesBackgroundImage(function(data) {
      if ( data.url ) {
        $scope.activitiesBackgroundImage = data.url;
      } else {
        $scope.activitiesBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/main.jpg';
      }
    });

    var mainHelpCookie = $cookies.showInqActHelp;
    if(mainHelpCookie == 0){
      $scope.helpCollapsed = true;
    } else {
      $scope.helpCollapsed = false;
    }

    $scope.toggleMainHelp = function () {
      if($scope.helpCollapsed){
        $cookies.showInqActHelp = 1;
        $scope.helpCollapsed = false;
      } else {
        $cookies.showInqActHelp = 0;
        $scope.helpCollapsed = true;
      }
    };

  });
