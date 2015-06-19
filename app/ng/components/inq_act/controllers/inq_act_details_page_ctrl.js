'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityDetailPageCtrl
 * @description
 * # InquiryActivityDetailPageCtrl
 * Controller of the arkofinquiryApp
 */

angular.module('arkofinquiryApp')
  .controller('InquiryActivityDetailPageCtrl', function ($scope, $routeParams, InquiryActivityService, InquiryActivityLogService, InquiryActivityStatusService, UserService, $rootScope, appConfig, $window, $q, $modal) {

    $scope.activityStatus = {
      exists: false,
      started: true
    };

    var currentActivityID = $routeParams.id;
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

    getCurrentStatus().then(function(success){
      console.log(success);

      if(_.isEmpty(success)){
        console.log('tühi');
        $scope.activityStatus.exists = false;
        $scope.activityStatus.started = false;
      } else if (success[0].status < 4){
        $scope.activityStatus.status = success[0].status;
        console.log('olemas, pole alustatud');
        $scope.activityStatus.exists = true;
        $scope.activityStatus.started = false;
      } else {
        $scope.activityStatus.status = success[0].status;
        console.log('juba alustatud');
        $scope.activityStatus.exists = true;
        $scope.activityStatus.started = true;
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
          createNewStatus().then(function(){
            console.log('tegin uue staatuse');
          })
        } else {
          // If status exists, update it
          success[0].status = postData.status;
          updateExistingStatus(success[0]).then(function(){
            console.log('muutsin olemasolevat');
          });
        }

        // Save log for feeds
        createNewLog().then(function(success){
          console.log('log saved');
        }, function(error){
          console.log(error);
        });

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
        console.log('Modal returned status: ' + status)
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
      console.log('uuno');
      window.window.location.href = url;
    };
  });
