'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserPassportCtrl', function ($scope, $http, $routeParams, UserService, $gravatar, InquiryActivityLogService, $rootScope, $filter) {

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.user = UserService.get({id: $routeParams.id}, function(){
      // Get gravatarURL for current profile and append it to user data
      $scope.user.gravatarUrl = getGravatarUrl($scope.user.user_email);

      if($scope.user.roles[0] == 'learner'){
        $scope.inqLog = InquiryActivityLogService.searchByLearnerID({learnerID: $routeParams.id}, function(success){
          for(var i = 0; i < $scope.inqLog.length; i++){
            // Convert Date strings to Date objects
            $scope.inqLog[i].created = $filter('stringToDate')($scope.inqLog[i].created);
            // Convert inq_activity object to array (remove id key)
            $scope.inqLog[i].inq_activity = _.values($scope.inqLog[i].inq_activity);
          }
        });
      } else if ($scope.user.roles[0] == 'teacher'){
        $scope.inqLog = InquiryActivityLogService.searchByTeacherID({teacherID: $routeParams.id}, function(success){
          for(var i = 0; i < $scope.inqLog.length; i++){
            // Convert Date strings to Date objects
            $scope.inqLog[i].created = $filter('stringToDate')($scope.inqLog[i].created);
            // Convert inq_activity object to array (remove id key)
            $scope.inqLog[i].inq_activity = _.values($scope.inqLog[i].inq_activity);
          }
        });
      }
    });

    console.log($scope.user);



    // Get gravatarUrl
    $scope.gravatarUrl = function(user) {
      return $gravatar.generate(user.user_email);
    };

    // Temporary badge placeholder array
    $scope.badgeRows = new Array(3);


    // Get gravatarUrl by email
    function getGravatarUrl(email) {
      return $gravatar.generate(email);
    }

  });


