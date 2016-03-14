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
    $scope.activitiesBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/main.jpg';
    InquiryActivityService.getActivitiesBackgroundImage(function(data) {
      $scope.activitiesBackgroundImage = data.url;
    });
  });
