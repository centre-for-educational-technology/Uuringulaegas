'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupPageCtrl', function ($scope, $http, $routeParams, UserService, $gravatar, GroupService, appConfig, $modal, $location) {

    $scope.group = GroupService.get({id: $routeParams.id}, function(){
      // On success get gravatarURL for each learner and append it to learner object
      $scope.group.author.gravatarUrl = getGravatarUrl($scope.group.author.user_email);
      for(var i = 0; i < $scope.group.learners.length; i++){
        $scope.group.learners[i].gravatarUrl = getGravatarUrl($scope.group.learners[i].user_email);
      }
    });

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.showTeacherProfile = function(id){
      $location.path('user/' + id);
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

    // Get gravatarUrl by email
    function getGravatarUrl(email) {
      return $gravatar.generate(email);
    }

  });


