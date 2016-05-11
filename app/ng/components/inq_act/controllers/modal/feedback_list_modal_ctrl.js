'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:TeacherReviewModalCtrl
 * @description
 * # TeacherReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('FeedbackListModalCtrl', function ($scope, $modalInstance, $rootScope, $q, $modal, appConfig, feedbackList) {

    $scope.feedbackList = feedbackList;

    $scope.cancel = function () {
      $modalInstance.dismiss('');
    };

    $scope.showPeerReviewModal = function (review) {
      $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/inq_feedback_view_modal.html',
        controller: 'FeedbackViewModalCtrl',
        resolve: {
          review: function () {
            return review;
          }
        }
      });
    };

  });
