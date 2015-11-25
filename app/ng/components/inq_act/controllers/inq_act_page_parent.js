'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InqActParentCtrl
 * @description
 * # InqActParentCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityParentCtrl', function ($scope, $stateParams, InquiryActivityService) {
    $scope.totals = InquiryActivityService.getTotals();

  });
