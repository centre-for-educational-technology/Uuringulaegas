'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:TeacherReviewModalCtrl
 * @description
 * # TeacherReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('TeacherReviewModalCtrl', function ($scope, $modalInstance, $rootScope, $q, InquiryActivityLogService, InquiryActivityStatusService, EvidenceService, PeerReviewService, TeacherReviewService, log, $modal, appConfig, InfoService, InquiryActivityService) {

    $scope.log = log;

      $scope.review = {};
      $scope.review.teacher = $rootScope.currentUserData.userID;
      $scope.review.learner = log.learnerID;
      $scope.review.inq_activity = log.inqID;

    $scope.evidence = EvidenceService.searchByLearnerAndActivity({learnerID: $scope.review.learner, activityID: $scope.review.inq_activity});
    $scope.peerReviews = PeerReviewService.searchByLearnerAndActivity({learnerID: $scope.review.learner, activityID: $scope.review.inq_activity});

      $scope.inqPhases = {};

      var inqAct;
      InquiryActivityService.get({id: $scope.review.inq_activity}, function (res) {
          inqAct = res;
          for(var i = 1; i <= 5; i++){
              if(inqAct['phase_' + i + '_level'] > 0){
                  $scope.inqPhases[i] = inqAct['phase_' + i + '_level']
              }
          }
          console.log(res);
      });

    $scope.reviewPhases = {};

    InfoService.getReviewGuide({}, function(response){
      $scope.review.post_content = response[0].post_content;
    });

    var logData = {
      teacher: $rootScope.currentUserData.userID,
      learner: $scope.review.learner,
      inq_activity: $scope.review.inq_activity,
      status: 7
    };
    var servicePromises = [];

    $scope.accept = function () {

      $scope.updating= true;
      $scope.review.evidence = $scope.evidence[0].id;
      angular.forEach($scope.reviewPhases, function(value, key){
        $scope.review['phase_' + key + '_level'] = value;
      });
      InquiryActivityStatusService.getCurrentStatus({learnerID: $scope.review.learner, inqActID: $scope.review.inq_activity}, function(response){
          if(response[0].status == 5){
            updateExistingStatus(response[0]);
            createNewLog(logData);
            createNewTeacherReview($scope.review);

            $q.all(servicePromises).then(function(){
              $modalInstance.close(logData.status);
            });
          }
        }
      );

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('');
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
      status.inq_activity = $scope.review.inq_activity; // Only send the key (id)
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
