'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InqActParentCtrl
 * @description
 * # InqActParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityParentCtrl', function ($scope, $stateParams, InquiryActivityService, appConfig) {
    $scope.totals = InquiryActivityService.getTotals();
    InquiryActivityService.getActivitiesBackgroundImage(function(data) {
      if ( data.url ) {
        $scope.activitiesBackgroundImage = data.url;
      } else {
        $scope.activitiesBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/main.jpg';
      }
    });
  });
