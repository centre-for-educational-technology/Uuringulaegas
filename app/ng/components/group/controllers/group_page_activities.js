/**
 * Created by sander on 04/04/16.
 */

'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupPageActivitiesCtrl
 * @description
 * # GroupPageActivitiesCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupPageActivitiesCtrl', function ($scope, $http, $stateParams, UserService, $gravatar, GroupService, appConfig, $modal, $location, InquiryActivityLogService, $q, $rootScope) {

    $scope.showActivityDetailPage = function(activity){
      $location.path('inq_act/' + activity.id)
    };

    $scope.group = GroupService.get({id: $stateParams.id}, function(success){
      // Success

      });
      //



    // Expose Underscore.js to scope
    $scope._ = _;


  });


