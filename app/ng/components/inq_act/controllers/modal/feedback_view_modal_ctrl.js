'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:PeerReviewModalCtrl
 * @description
 * # PeerReviewModalCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('FeedbackViewModalCtrl', function ($scope, $modalInstance, review) {
    
    var timeFormat = 'YYYY-MM-DD HH:mm:ss';
    review.date = new Date(moment(review.post_modified, timeFormat));

    console.log(review);

    $scope.review = review;

    $scope.accept = function () {
      $modalInstance.close();
    };

  });
