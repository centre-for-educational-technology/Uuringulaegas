'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:HallOfFameCtrl
 * @description
 * # HallOfFameCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('HallOfFameCtrl', function ($scope, UserService, $location, $gravatar) {

    $scope._ = _;

    $scope.hallOfFame = UserService.getHallOfFame();

    // Get gravatarUrl
    $scope.gravatarUrl = function(learner) {
      return $gravatar.generate(learner.email);
    };

  });


