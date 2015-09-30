'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:PeerReviewModalCtrl
 * @description
 * # PeerReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('PeerReviewModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, PeerReviewService, log) {

    $scope.log = log;

    console.log(log);
    $scope.evidence =  EvidenceService.searchByLearnerAndActivity({learnerID: log.learner.ID, activityID: log.inq_activity[0].id});
    console.log($scope.evidence);

    $scope.review = {};
    $scope.review.peer = $rootScope.currentUserData.userID;
    $scope.review.learner = log.learner.ID;
    $scope.review.inq_activity = log.inq_activity[0].id;
    $scope.review.evidence = $scope.evidence[0].id;

    var logData = {
      peer: $rootScope.currentUserData.userID,
      learner: log.learner.ID,
      inq_activity: log.inq_activity[0].id,
      status: 6
    };
    var servicePromises = [];

    $scope.accept = function () {

      $scope.updating= true;

      createNewLog(logData).then(function(){console.log('created log')});
      createNewPeerReview($scope.review).then(function(){console.log('created peer review')});

      $q.all(servicePromises).then(function(){
        $modalInstance.close(logData.status);
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

    function updateExistingStatus(status){
      status.status = logData.status;
      status.inq_activity = log.inq_activity[0].id; // Only send the key (id)
      var service = status.$update();
      servicePromises.push(service);
      return service;
    }

    function createNewPeerReview(review){
      var service = new PeerReviewService(review).$save(review);
      servicePromises.push(service);
      return service;
    }

  });
