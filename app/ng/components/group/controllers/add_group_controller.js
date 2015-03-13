'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddGroupCtrl
 * @description
 * # AddGroupCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('AddGroupCtrl', function ($scope, $resource, GroupService, UserService, $filter) {

    // Set up empty userData object
    resetForm();



    $scope.group = new GroupService();

    $scope.group = {
      name: '',
      learners: [],
      teachers: []
    };

    // Create new User Service
    var users = new UserService();
    $scope.loadLearners = function(query) {
      return UserService.query({/*filter: 'Mobiilne'*/}, function(data){
        console.log(query);
        console.log(data);
        console.log($filter('filter')(data, query));
        return $filter('filter')(data, "11111111111");
      }).$promise;
    };

      // For User JSON dump
      test();
      function test(query) {
        return UserService.query({}, function(data){
          $scope.learnerList = data;
        }).$promise;
      }

     /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    // Save new Group
    $scope.addGroup = function(group){
      $scope.errors = null;
      $scope.updating = true;

      // append from data 'extra' object to groupData object (same keys)
      //_.extend(group, $scope.groupData.extra);

      // POST to DB
      group.$save(group, function() {
        // success
        $scope.postingState = 1; // OK
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
      }, function(group){
        // error
        $scope.postingState = 2; // Error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
      });
    };


    function resetForm() {
      $scope.groupData = {
        name: '',
        learners: [
          {
            id: '7',
            name: 'Onu toomas'
          }
        ],
        teachers: []
      };
    }

  });


