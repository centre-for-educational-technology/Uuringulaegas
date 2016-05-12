'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserPassportCtrl', function ($scope, $http, $stateParams, UserService, $gravatar, InquiryActivityLogService, $rootScope, $filter, InquiryActivityStatusService, $location) {


    $scope.saveCoverButtonDisabled = true;
    $scope.saveCoverButtonText = $scope.langStrings.user.passport.titleSaveCover;

    $scope.ownProfile = $rootScope.currentUserData.userID == $stateParams.id;


    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.user = UserService.get({id: $stateParams.id}, function(successData){
      // Get gravatarURL for current profile and append it to user data
      $scope.user.gravatarUrl = getGravatarUrl($scope.user.user_email);

      if($scope.user.roles[0] == 'learner'){
        $scope.inqLog = InquiryActivityLogService.searchByLearnerID({learnerID: $stateParams.id}, function(success){
          for(var i = 0; i < $scope.inqLog.length; i++){
            // Convert Date strings to Date objects
            $scope.inqLog[i].created = $filter('stringToDate')($scope.inqLog[i].created);
            // Convert inq_activity object to array (remove id key)
            $scope.inqLog[i].inq_activity = _.values($scope.inqLog[i].inq_activity);
          }
        });
        $scope.displayedGroups = $scope.user.groups;
      } else if ($scope.user.roles[0] == 'teacher'){
        $scope.inqLog = InquiryActivityLogService.searchByTeacherID({teacherID: $stateParams.id}, function(success){
          for(var i = 0; i < $scope.inqLog.length; i++){
            // Convert Date strings to Date objects
            $scope.inqLog[i].created = $filter('stringToDate')($scope.inqLog[i].created);
            // Convert inq_activity object to array (remove id key)
            $scope.inqLog[i].inq_activity = _.values($scope.inqLog[i].inq_activity);
          }
        });
        $scope.displayedGroups = $scope.user.groups_teacher;
      }

      if(Array.isArray($scope.user.profile_background)){
        $scope.user.profile_background = 1;
      }
      $scope.currentCover = $scope.user.profile_background;

      $scope.profile_background_url = 'images/backgrounds/profile/profile'+$scope.user.profile_background+'.jpg';
    });






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



    //Get next cover image id
    $scope.changeCover = function(){
      $scope.saveCoverButtonText = $scope.langStrings.user.passport.titleSaveCover;
      if($scope.user.profile_background<=7){
        $scope.user.profile_background = parseInt($scope.user.profile_background) + 1;

      }else if($scope.user.profile_background==8){
        $scope.user.profile_background = 1;
      }

      if($scope.user.profile_background != $scope.currentCover){
        $scope.saveCoverButtonDisabled = false;
      }else{
        $scope.saveCoverButtonDisabled = true;
      }

      $scope.profile_background_url = 'images/backgrounds/profile/profile'+$scope.user.profile_background+'.jpg';

    };

    //Save cover image
    $scope.saveCover = function(user){
      UserService.save({
        id: user.id
      }, {
        profile_background: $scope.user.profile_background
      }, function(data) {
        $scope.saveCoverButtonDisabled = true;
        $scope.saveCoverButtonText = $scope.langStrings.user.passport.titleSaveCoverSaved;
        user.profile_background = data.profile_background;
      }, function(response){
        // TODO Notify user, maybe reset to original background
        $scope.errors = response;
        $scope.user.profile_background = $scope.currentCover;
        $scope.saveCoverButtonText = $scope.langStrings.user.passport.titleSaveCoverFailed;
      });

    };




    /**
     *
     * Getters for tab contents
     *
     */

    $scope.recommendedActivities = InquiryActivityStatusService.searchByStatus({learnerID: $stateParams.id, status: 1}, function(){});

    $scope.startedActivities = InquiryActivityStatusService.searchByStatus({learnerID: $stateParams.id, status: 4}, function(response){
      for(var i = 0; i < response.length; i++){
        response[i].inq_activity = _.values(response[i].inq_activity);
      }

    });

    $scope.completedActivities = InquiryActivityStatusService.searchByStatus({learnerID: $stateParams.id, status: 5}, function(response){
      for(var i = 0; i < response.length; i++){
        response[i].inq_activity = _.values(response[i].inq_activity);
      }
    });

    $scope.showInqActivityDetailPage = function(act){
      $location.path('inq_act/' + act.id)
    };

    $scope.showGroupPage = function(groupID){
      $location.path('group/' + groupID)
    };

  });
