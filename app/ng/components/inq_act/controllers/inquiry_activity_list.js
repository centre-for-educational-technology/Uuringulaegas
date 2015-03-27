'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddInquiryActivityCtrl
 * @description
 * # AddInquiryActivityCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityListCtrl', function ($scope, $http, appConfig, InquiryActivityService, $modal) {

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.inqActList = InquiryActivityService.query();

    $scope.openDetails = function (act) {

      var modalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/inq_act_details_modal.html',
        controller: 'InquiryActivityDetailsModalCtrl',
        resolve: {
          activity: function () {
            return act;
          }
        }
      });

      modalInstance.result.then(function (acceptedID) {
        console.log('Accepted activity with ID: ' + acceptedID)
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    console.log($scope.inqActList)

  });


