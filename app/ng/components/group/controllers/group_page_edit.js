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
      levels: {
        1: 'Basic',
        2: 'Advanced',
        3: 'Expert'
      }
    };

    // Set up empty userData object
    resetForm();

    $scope.searchedLearners = [];
    $scope.searchedTeachers = [];


    $scope.loadLearners = function(query) {
      return UserService.queryLearnersByName({searchName: query}, function(data){
        $scope.searchedLearners = data;
      }).$promise;
    };

    $scope.loadTeachers = function(query) {
      return UserService.queryTeachersByName({searchName: query}, function(data){
        $scope.searchedTeachers = data;
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
        $scope.groupForm.learners[i].id = parseInt(success.learners[i].ID);
      }
      for(var t = 0; t < $scope.groupForm.teachers.length; t++){
        $scope.groupForm.teachers[t].id = parseInt(success.teachers[t].ID);
      }
      success.inq_activities = _.values(success.inq_activities);
    });

    $scope.editGroup = new GroupService();

    // Save new Group
    $scope.updateGroup = function(editGroup){
      $scope.errors = null;
      $scope.updating = true;

      for(var i = 0; i < $scope.groupForm.learners.length; i++){
        $scope.groupForm.learners[i] = $scope.groupForm.learners[i].id;
      }

      for(var t = 0; t < $scope.groupForm.teachers.length; t++){
        $scope.groupForm.teachers[t] = $scope.groupForm.teachers[t].id;
      }

      for(var j = 0; j < $scope.groupForm.inq_activities.length; j++){
        $scope.groupForm.inq_activities[j] = $scope.groupForm.inq_activities[j].id;
      }

      // append form data object to group object (same keys)
      _.extend(editGroup, $scope.groupForm);

      //// Push only ID's from groupForm to GroupService.learners array
      //// NEEDED ONLY for ng-tags-input, not needed for ui.select module
      //
      //for(var i = 0; i < $scope.groupForm.learners.length; i++){
      //  newGroup.learners.push($scope.groupForm.learners[i].id);
      //}

      // POST to DB
      editGroup.$update(editGroup, function() {
        // success
        $scope.updating = false;

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(groupForm){
        // error
        $scope.updating = false;
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
        teachers: [],
        inq_activities: []
      };
    }

  });
