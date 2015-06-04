'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupPageCtrl', function ($scope, $http, $routeParams, UserService, $gravatar, GroupService, appConfig, $modal, $location, InquiryActivityLogService, $q) {

    var timeFormat = 'YYYY-MM-DD HH:mm:ss';

    $scope.inqLog = [];
    var inqLogServicePromises = [];

    var activityListString = '';

    $scope.group = GroupService.get({id: $routeParams.id}, function(success){
      // Success
      createActivityListString();
      $scope.group.author.gravatarUrl = getGravatarUrl($scope.group.author.user_email);
      for(var i = 0; i < $scope.group.learners.length; i++){
        $scope.group.learners[i].gravatarUrl = getGravatarUrl($scope.group.learners[i].user_email);
        getUserLog($scope.group.learners[i]);
      }

      // Wait for all logs to be fetched (promises to resolve)
      $q.all(inqLogServicePromises).then(function(response){
        // Flatten the individual user log arrays to one big array
        // that can be handled by ngRepeat
        response = _.flatten(response);
        for(var i = 0; i < response.length; i++){
          // Convert Date strings to Date objects
          response[i].created = new Date(moment(response[i].created, timeFormat));
          // Convert inq_activity object to array (remove id key)
          response[i].inq_activity = _.values(response[i].inq_activity);
        }

        $scope.inqLog = response;
        console.log($scope.inqLog);
      });
      //
    });

    function createActivityListString() {
      var activityListKeys = _.keys($scope.group.inq_activities);
      for(var i = 0; i < activityListKeys.length; i++){
        activityListString += activityListKeys[i];
        if(i + 1 < activityListKeys.length){
          activityListString += ','
        }
      }
    }

    function getUserLog(user){
      //var log = InquiryActivityLogService.searchByLearnerID({learnerID: user.ID});
      var log = InquiryActivityLogService.searchByLearnerWithActivities({learnerID: user.ID, activityList: activityListString});
      inqLogServicePromises.push(log.$promise);
      return log;
    }

    // Get gravatarUrl
    $scope.gravatarUrl = function(user) {
      return $gravatar.generate(user.user_email);
    };

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


