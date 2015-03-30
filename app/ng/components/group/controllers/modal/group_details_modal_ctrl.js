'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupDetailsModalCtrl
 * @description
 * # GroupDetailsModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('GroupDetailsModalCtrl', function ($scope, $modalInstance, group) {

    $scope.group = group;

    $scope.accept = function () {
      $modalInstance.close($scope.group.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
