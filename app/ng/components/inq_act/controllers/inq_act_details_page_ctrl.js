'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityDetailPageCtrl
 * @description
 * # InquiryActivityDetailPageCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('InquiryActivityDetailPageCtrl', function ($scope, $routeParams, InquiryActivityService, InquiryActivityLogService, InquiryActivityStatusService, $rootScope) {

    $scope.activity = InquiryActivityService.get({id: $routeParams.id});

    var logService = new InquiryActivityLogService();


    $scope.accept = function () {
      InquiryActivityStatusService.searchIfExists({learnerID: $rootScope.currentUserData.userID, inqActID: $scope.activity.id}, function(success){
        console.log(_.isEmpty(success));

        logService.$save(logService, function(success){
          // success
        }, function(error){
          console.log(error);
        });

      });

      /*if(_.isEmpty(existingEntry)){
        console.log('tee uus');
      } else {
        console.log('muuda olemasolevat');
      }*/

      // todo - check if returned object is empty or not and decide to POST or PUT

      logService.learner = $rootScope.currentUserData.userID;
      logService.inq_activity = $scope.activity.id;
      logService.status = 4; // Started the activity


    };
  });
