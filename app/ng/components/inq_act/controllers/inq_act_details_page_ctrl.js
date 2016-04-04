'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityDetailPageCtrl
 * @description
 * # InquiryActivityDetailPageCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('InquiryActivityDetailPageCtrl', function ($scope, $stateParams, InquiryActivityService, InquiryActivityLogService, InquiryActivityStatusService, UserService, $rootScope, appConfig, $window, $q, $modal, EvidenceService) {

    $scope.activityStatus = {
      exists: false,
      started: true
    };

    var currentActivityID = $stateParams.id;
    var servicePromises = [];
    var postData = {
      learner: $rootScope.currentUserData.userID,
      inq_activity: currentActivityID
    };

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.activity = InquiryActivityService.get({id: currentActivityID}, function(response){
      $scope.activity.teacher = UserService.get({id: response.post_author});
    });


    //Single activity background image
    InquiryActivityService.getActivityBackgroundImage(function(data) {
      if ( data.url ) {
        $scope.activityBackgroundImage = data.url;
      } else {
        $scope.activityBackgroundImage = appConfig.appBase + 'images/backgrounds/activity/single.jpg';
      }

    });



    getCurrentStatus().then(function(success){
      if(_.isEmpty(success)){
        $scope.activityStatus.exists = false;
        $scope.activityStatus.started = false;
      } else if (success[0].status < 4){
        $scope.activityStatus.status = success[0].status;
        $scope.activityStatus.exists = true;
        $scope.activityStatus.started = false;
      } else {
        $scope.activityStatus.status = success[0].status;
        $scope.activityStatus.exists = true;
        $scope.activityStatus.started = true;
      }

      if(!_.isEmpty(success) && success[0].status >= 5){
        EvidenceService.searchByLearnerAndActivity({learnerID: $rootScope.currentUserData.userID, activityID: currentActivityID}, function(success){
          $scope.evidence = success[0];
        });
      }

    });


    $scope.startActivity = function () {
      $scope.updating= true;
      postData.status = 4; // Started the activity

      var logService = new InquiryActivityLogService(postData);
      var statusService = new InquiryActivityStatusService(postData);

      getCurrentStatus().then(function(success){
        if(_.isEmpty(success)){
          // If status doesn't exist, create it
          createNewStatus()
        } else {
          // If status exists, update it
          success[0].status = postData.status;
          updateExistingStatus(success[0])
        }

        // Save log for feeds
        createNewLog();

        // Wait for all services to finish
        $q.all(servicePromises).then(function(){
          $scope.updating = false;
          $scope.activityStatus.started = true;
          $scope.activityStatus.status = postData.status;
        });
      });

    };

    $scope.openEvidenceModal = function (activity) {

      var modalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/inq_evidence_submit_modal.html',
        controller: 'EvidenceSubmitModalCtrl',
        resolve: {
          activity: function () {
            return activity;
          }
        }
      });

      modalInstance.result.then(function (status) {
        $scope.activityStatus.status = status;
      });
    };

    $scope.openEvidenceEditModal = function (evidence) {

      $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/inq_evidence_edit_modal.html',
        controller: 'EvidenceEditModalCtrl',
        resolve: {
          evidence: function () {
            return evidence;
          }
        }
      });
    };

    $scope.openStartActivityModal = function (activity) {

      var startModalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/inq_act_start_modal.html',
        controller: 'StartActivityModalCtrl',
        resolve: {
          activity: function () {
            return activity;
          }
        }
      });

      startModalInstance.result.then(function (status) {
        $scope.startActivity();
        window.open(activity.location_web, '_blank');
      });
    };

    function createNewLog(){
      var service = new InquiryActivityLogService(postData).$save(postData);
      servicePromises.push(service);
      return service;
    }

    function updateExistingStatus(status){
      status.inq_activity = _.keys(status.inq_activity)[0]; // Only send the key (id)
      var service = status.$update();
      servicePromises.push(service);
      return service;
    }

    function createNewStatus(){
      var service = new InquiryActivityStatusService(postData).$save(postData);
      servicePromises.push(service);
      return service;
    }

    function getCurrentStatus(){
      return InquiryActivityStatusService.getCurrentStatus({learnerID: $rootScope.currentUserData.userID, inqActID: currentActivityID}).$promise;
    }


    $scope.goToExternalLink = function (url){
      window.window.location.href = url;
    };
  });

angular.module('arkofinquiryApp')
  .controller('StartActivityModalCtrl', function ($scope, $modalInstance, activity) {

    $scope.activity = activity;

    $scope.accept = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });