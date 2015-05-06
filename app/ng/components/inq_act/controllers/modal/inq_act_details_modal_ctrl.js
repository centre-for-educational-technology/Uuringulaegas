'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityDetailsModalCtrl
 * @description
 * # InquiryActivityDetailsModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('InquiryActivityDetailsModalCtrl', function ($scope, $modalInstance, activity, InquiryActivityLogService, $rootScope) {

    $scope.activity = activity;

    var service = new InquiryActivityLogService();

    $scope.accept = function () {
      service.learner = $rootScope.currentUserData.userID;
      service.inq_activity = $scope.activity.id;
      service.status = 4; // Started the activity

      service.$save(service, function(success){
        $modalInstance.close($scope.activity.id, success);
      }, function(error){
        console.log(error);
      });


    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
