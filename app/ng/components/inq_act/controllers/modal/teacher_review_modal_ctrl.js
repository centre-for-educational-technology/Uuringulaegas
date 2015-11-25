'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:TeacherReviewModalCtrl
 * @description
 * # TeacherReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('TeacherReviewModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, PeerReviewService, TeacherReviewService, log, $modal, appConfig, InfoService) {

    $scope.log = log;

    $scope.evidence = EvidenceService.searchByLearnerAndActivity({learnerID: log.learner.ID, activityID: log.inq_activity[0].id});
    $scope.peerReviews = PeerReviewService.searchByLearnerAndActivity({learnerID: log.learner.ID, activityID: log.inq_activity[0].id});

    $scope.review = {};
    $scope.review.teacher = $rootScope.currentUserData.userID;
    $scope.review.learner = log.learner.ID;
    $scope.review.inq_activity = log.inq_activity[0].id;

    $scope.reviewPhases = {};
    $scope.inqPhases = {};
    for(var i = 1; i <= 5; i++){
      if(log.inq_activity[0]['phase_' + i + '_level'] > 0){
        $scope.inqPhases[i] = log.inq_activity[0]['phase_' + i + '_level']
      }
    }

    InfoService.getReviewGuide({}, function(response){
      $scope.review.post_content = response[0].post_content;
    });

    var logData = {
      teacher: $rootScope.currentUserData.userID,
      learner: log.learner.ID,
      inq_activity: log.inq_activity[0].id,
      status: 7
    };
    var servicePromises = [];

    $scope.accept = function () {

      $scope.updating= true;
      $scope.review.evidence = $scope.evidence[0].id;
      angular.forEach($scope.reviewPhases, function(value, key){
        $scope.review['phase_' + key + '_level'] = value;
      });
      InquiryActivityStatusService.getCurrentStatus({learnerID: log.learner.ID, inqActID: log.inq_activity[0].id}, function(response){
          if(response[0].status == 5){
            updateExistingStatus(response[0]).then(function(){console.log('updated status to 7')});
            createNewLog(logData).then(function(){console.log('created log')});
            createNewTeacherReview($scope.review).then(function(){console.log('created peer review')});

            $q.all(servicePromises).then(function(){
              $modalInstance.close(logData.status);
            });
          }
        }
      );

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.showPeerReviewModal = function (review) {
      $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/peer_review_view_modal.html',
        controller: 'PeerReviewViewModalCtrl',
        resolve: {
          review: function () {
            return review;
          }
        }
      });
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

    function createNewTeacherReview(review){
      var service = new TeacherReviewService(review).$save(review);
      servicePromises.push(service);
      return service;
    }

  });
