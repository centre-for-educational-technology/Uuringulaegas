'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserSurveyCtrl
 * @description
 * # UserSurveyCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserSurveyCtrl', function ($scope, $http, $document, UserService, $rootScope) {

    OpenBadges.issue(['http://www.tlu.ee/~aido/badges/test.json'], function(errors, successes) {
      //...
    });

    // Set up empty userData object
    resetForm();

    /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    // Save new User
    $scope.completeSurvey = function(){
      $scope.errors = null;
      $scope.updating = true;


      UserService.update({id: $rootScope.currentUserData.userID}, $scope.formData);



      /*
      smt.$save(user, function() {
        // success
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(response){
        // error
        $scope.updating = false;
        $scope.errors = response;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 2; // Error
        });
      });*/
    };


    function resetForm() {
      $scope.formData = {
        interests: [''],
        like_research_text: '',
        why_ark_text: ''
      };
    }

  });