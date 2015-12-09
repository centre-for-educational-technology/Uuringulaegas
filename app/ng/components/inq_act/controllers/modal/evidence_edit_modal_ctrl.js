'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:EvidenceEditModalCtrl
 * @description
 * # EvidenceEditModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('EvidenceEditModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, evidence) {

    $scope.evidence = evidence;

    $scope.editingEvidence = false;

    var logData = {
      learner: $rootScope.currentUserData.userID,
      inq_activity: _.keys(evidence.inq_activity)[0],
      status: 51
    };
    var servicePromises = [];

    $scope.update = function () {

      $scope.updating= true;

      InquiryActivityStatusService.getCurrentStatus({learnerID: $rootScope.currentUserData.userID, inqActID: logData.inq_activity}, function(response){
        console.log('sttatus: ' + response[0].status);
        if(response[0].status >= 5){
          createNewLog(logData).then(function(){console.log('created log')});
          updateEvidence($scope.evidence).then(function(){console.log('edited evidence')});

          $q.all(servicePromises).then(function(){
            $modalInstance.close(logData.status);
          });
        }
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    function createNewLog(logData){
      var service = new InquiryActivityLogService(logData).$save(logData);
      servicePromises.push(service);
      return service;
    }

    function updateEvidence(evidence){
      evidence.learner = logData.learner;
      evidence.inq_activity = logData.inq_activity; // Only send the key (id)
      var service = new EvidenceService(evidence).$update(evidence);
      servicePromises.push(service);
      return service;
    }

  });
