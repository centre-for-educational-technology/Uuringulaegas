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

    $scope.currentPage = 1;
    $scope.listLoaded = false;

    if(_.isEmpty($location.search())){
      $scope.inqActList = InquiryActivityService.queryByPage({page: 1}, function(){
        $scope.listLoaded = true;
      });
      $scope.keywordMode = false;
      $scope.keywordText = '';
    } else {
      $scope.inqActList = InquiryActivityService.searchByKeyword({keyword: $location.search().keyword}, function(){
        $scope.listLoaded = true;
      });
      $scope.keywordMode = true;
      $scope.keywordText = $location.search().keyword;
    }

    $scope.loadPage = function(currentPage){
      $scope.listLoaded = false;
      $scope.inqActList = InquiryActivityService.queryByPage({page: currentPage}, function(){
        $scope.listLoaded = true;
      });
    };

    //$scope.totals = InquiryActivityService.getTotals();



    $scope.getID = function(activity){
      if (activity.ID){
        return activity.ID
      } else {
        return activity.id
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
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

  });
