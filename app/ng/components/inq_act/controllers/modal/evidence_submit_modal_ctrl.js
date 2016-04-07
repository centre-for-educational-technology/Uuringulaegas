'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:EvidenceSubmitModalCtrl
 * @description
 * # EvidenceSubmitModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('EvidenceSubmitModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, activity, InfoService) {

    $scope.activity = activity;

    $scope.evidence = {};
    $scope.evidence.learner = $rootScope.currentUserData.userID;
    $scope.evidence.inq_activity = activity.id;

    var logData = {
      learner: $rootScope.currentUserData.userID,
      inq_activity: activity.id,
      status: 5
    };
    var servicePromises = [];

    InfoService.getEvidenceGuide({}, function(response){
      $scope.guide = response[0].post_content;
    });

    $scope.accept = function () {

      $scope.updating= true;

      InquiryActivityStatusService.getCurrentStatus({learnerID: $rootScope.currentUserData.userID, inqActID: activity.id}, function(response){
        if(response[0].status == 4){
          updateExistingStatus(response[0]).then(function(){
            createNewLog(logData);
            createNewEvidence($scope.evidence);
          });


          $q.all(servicePromises).then(function(){
            $modalInstance.close(logData.status);
          });
        }
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('');
    };

    function createNewLog(logData){
      var service = new InquiryActivityLogService(logData).$save(logData);
      servicePromises.push(service);
      return service;
    }

    function updateExistingStatus(status){
      status.status = logData.status;
      status.inq_activity = activity.id; // Only send the key (id)
      var service = status.$update();
      servicePromises.push(service);
      return service;
    }

    function createNewEvidence(evidence){
      var service = new EvidenceService(evidence).$save(evidence);
      servicePromises.push(service);
      return service;
    }

  });
