'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddGroupCtrl
 * @description
 * # AddGroupCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('AddGroupCtrl', function ($scope, $resource, $document, GroupService, UserService) {

    var mapDOM = angular.element(document.getElementById('map-canvas'));

    // Set up empty userData object
    resetForm();

    // Create new User Service
    $scope.loadLearners = function(query) {
      return UserService.queryLearnersByName({searchName: query}, function(data){
        return data;
      }).$promise;
    };

     /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    $scope.newGroup = new GroupService();

    // Save new Group
    $scope.addGroup = function(newGroup){
      $scope.errors = null;
      $scope.updating = true;

      // Copy data from groupForm object to GroupService
      newGroup.name = $scope.groupForm.name;
      newGroup.learners = [];

      // Push only ID's from groupForm to GroupService.learners array
      for(var i = 0; i < $scope.groupForm.learners.length; i++){
        newGroup.learners.push($scope.groupForm.learners[i].id);
      };

      // POST to DB
      newGroup.$save(newGroup, function() {
        // success
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(newGroup){
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
        learners: [],
        teachers: []
      };
    }

  });


