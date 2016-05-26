'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:BadgeInfoCtrl
 * @description
 * # BadgeInfoCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('BadgeInfoCtrl', function ($scope, InfoService, $stateParams) {

    InfoService.getBadgeInfo({badgeKey: $stateParams.key}, function (res) {
      $scope.badge = res;
    });
  });
