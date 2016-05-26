'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:BackpackModalCtrl
 * @description
 * # BackpackModalCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('BackpackModalCtrl', function ($scope, appConfig, badges, $modalInstance, UserService, email) {
    
    $scope.badges = badges;
    $scope.email = email;
    
    $scope.issueBadges = function () {
      UserService.getBadgeAssertions({'badgeKeys[]': $scope.checkedBadges}, function (res) {
        console.log(res.assertions);
        OpenBadges.issue(res.assertions, function(errors, successes) {
          if(successes.length > 0){
            $modalInstance.close(successes.length);
          } else {
            $scope.backpackError = true;
          }
        });
      });
    };

    $scope.checkedBadges = [];
    $scope.toggleCheck = function (badgeKey) {
      if ($scope.checkedBadges.indexOf(badgeKey) === -1) {
        $scope.checkedBadges.push(badgeKey);
      } else {
        $scope.checkedBadges.splice($scope.checkedBadges.indexOf(badgeKey), 1);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('');
    };

  });


