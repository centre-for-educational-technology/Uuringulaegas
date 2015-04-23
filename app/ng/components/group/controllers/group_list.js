'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupListCtrl
 * @description
 * # GroupListCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupListCtrl', function ($scope, $http, appConfig, GroupService, $modal, $location) {

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.groupList = GroupService.query();

    $scope.showGroupPage = function(group){
      $location.path('groups/' + group.id)
    };

    // Opens modal with group info, only used in development/testing
    $scope.openDetails = function (group) {

      var modalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/group/views/partials/group_details_modal.html',
        controller: 'GroupDetailsModalCtrl',
        resolve: {
          group: function () {
            return group;
          }
        }
      });

      modalInstance.result.then(function (acceptedID) {
        console.log('Wanted to join group with ID: ' + acceptedID)
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

  });


