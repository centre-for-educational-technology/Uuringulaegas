'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityListCtrl
 * @description
 * # InquiryActivityListCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityListCtrl', function ($scope, $http, appConfig, InquiryActivityService, $modal, $location) {

    // Expose Underscore.js to scope
    $scope._ = _;

    if(_.isEmpty($location.search())){
      $scope.inqActList = InquiryActivityService.query();
    } else {
      $scope.inqActList = InquiryActivityService.searchByKeyword({keyword: $location.search().keyword});
    }

    //console.log($location.search().keyword);

    $scope.showDetailPage = function(activity){
      if (activity.ID){
        $location.path('inq_act/' + activity.ID)
      } else {
        $location.path('inq_act/' + activity.id)
      }

    };



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

  });


