'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityDetailsModalCtrl
 * @description
 * # InquiryActivityDetailsModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('InquiryActivityDetailsModalCtrl', function ($scope, $modalInstance, activity) {

    $scope.activity = activity;

    $scope.accept = function () {
      $modalInstance.close($scope.activity.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
