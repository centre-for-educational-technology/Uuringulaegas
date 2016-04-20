'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:HallOfFameCtrl
 * @description
 * # HallOfFameCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('HallOfFameCtrl', function ($scope, UserService, $location, $gravatar, $cookies) {

    $scope._ = _;

    $scope.hallOfFame = UserService.getHallOfFame();

    // Get gravatarUrl
    $scope.gravatarUrl = function(learner) {
      return $gravatar.generate(learner.email);
    };

    var HelpCookie = $cookies.showHofHelp;
    if(HelpCookie == 0){
      $scope.helpCollapsed = true;
    } else {
      $scope.helpCollapsed = false;
    }

    $scope.toggleHelp = function () {
      if($scope.helpCollapsed){
        $cookies.showHofHelp = 1;
        $scope.helpCollapsed = false;
      } else {
        $cookies.showHofHelp = 0;
        $scope.helpCollapsed = true;
      }
    };

  });


