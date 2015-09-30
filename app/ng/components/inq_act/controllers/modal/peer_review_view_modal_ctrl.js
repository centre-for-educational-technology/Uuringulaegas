'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:PeerReviewModalCtrl
 * @description
 * # PeerReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('PeerReviewViewModalCtrl', function ($scope, $modalInstance, review) {

    var timeFormat = 'YYYY-MM-DD HH:mm:ss';
    review.post_modified = new Date(moment(review.post_modified, timeFormat));

    review.inq_activity = _.values(review.inq_activity);

    $scope.review = review;

    $scope.accept = function () {
      $modalInstance.close();
    };

  });
