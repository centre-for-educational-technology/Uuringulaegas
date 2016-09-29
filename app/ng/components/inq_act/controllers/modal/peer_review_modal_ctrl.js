'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:PeerReviewModalCtrl
 * @description
 * # PeerReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('PeerReviewModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, PeerReviewService, log, InfoService) {

    $scope.log = log;

    $scope.review = {};
    $scope.review.peer = $rootScope.currentUserData.userID;
    $scope.review.learner = log.learnerID;
    $scope.review.inq_activity = log.inqID;
    //$scope.review.evidence = $scope.evidence[0].id;

    $scope.evidence =  EvidenceService.searchByLearnerAndActivity({learnerID: $scope.review.learner, activityID: $scope.review.inq_activity}, function(success){
      $scope.review.evidence = $scope.evidence[0].id;
    });

    InfoService.getReviewGuide({}, function(response){
      $scope.review.post_content = response[0].post_content;
    });

    var logData = {
      peer: $rootScope.currentUserData.userID,
      learner: $scope.review.learner,
      inq_activity: $scope.review.inq_activity,
      status: 6
    };
    var servicePromises = [];

    $scope.accept = function () {

      $scope.updating= true;

      createNewLog(logData);
      createNewPeerReview($scope.review);

      $q.all(servicePromises).then(function(){
        $modalInstance.close(logData.status);
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
      status.inq_activity = $scope.review.inq_activity; // Only send the key (id)
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
