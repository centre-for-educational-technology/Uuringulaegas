'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddGroupCtrl
 * @description
 * # AddGroupCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('EditGroupCtrl', function ($scope, $stateParams, $resource, $document, GroupService, UserService, InquiryActivityService) {

    $scope.formOptions = {
      domains: {
        chemistry: 'Chemistry',
        engineering: 'Engineering',
        biology: 'Biology',
        physics: 'Physics',
        mathematics: 'Mathematics',
        electricity: 'Electricity'
      },
      levels: {
        1: 'Basic',
        2: 'Advanced',
        3: 'Expert'
      }
    };

    // Set up empty userData object
    resetForm();

    $scope.searchedLearners = [];

    // Create new User Service
    $scope.loadLearners = function(query) {
      return UserService.queryLearnersByName({searchName: query}, function(data){
        $scope.searchedLearners = data;
      }).$promise;
    };

    $scope.searchedActivities = [];

    // Create new User Service
    $scope.loadActivities = function(query) {
      return InquiryActivityService.searchByName({searchName: query}, function(data){
        $scope.searchedActivities = data;
      }).$promise;
    };

     /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    $scope.groupForm = GroupService.get({id: $stateParams.id}, function(success){
      for(var i = 0; i < $scope.groupForm.learners.length; i++){
        $scope.groupForm.learners[i] =  parseInt(success.learners[i].ID);
      }
      // TODO: paranda ära
    });

    $scope.newGroup = new GroupService();

    // Save new Group
    $scope.updateGroup = function(groupForm){
      $scope.errors = null;
      $scope.updating = true;


      //// Push only ID's from groupForm to GroupService.learners array
      //// NEEDED ONLY for ng-tags-input, not needed for ui.select module
      //
      //for(var i = 0; i < $scope.groupForm.learners.length; i++){
      //  newGroup.learners.push($scope.groupForm.learners[i].id);
      //}

      // POST to DB
      newGroup.$update(groupForm, function() {
        // success
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(groupForm){
        // error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 2; // Error
        });
      });
    };


    function resetForm() {
      $scope.groupForm = {
        name: '',
        description: '',
        domains: [''],
        learners: [],
        inq_activities: []
      };
    }

  });
