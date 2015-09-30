'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('HelpPageCtrl', function ($scope, HelpPageService) {

    $scope.help = HelpPageService.getHelpPages();
  });
