'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AnnouncementnCtrl
 * @description
 * # AnnouncementCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('AnnouncementCtrl', function ($scope, InfoService) {

    InfoService.getAnnouncement({}, function(response){
      $scope.announcement = response;
    });
  });
