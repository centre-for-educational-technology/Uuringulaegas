'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserSurveyCtrl
 * @description
 * # UserSurveyCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserSurveyCtrl', function ($scope, $http, $document, UserService, $rootScope, $stateParams) {

    /*
    OpenBadges.issue(['http://www.tlu.ee/~aido/badges/test.json'], function(errors, successes) {
      //...
    });*/

    $scope.forced = $stateParams.forced;

    // Set up empty userData object
    resetForm();

    UserService.get({id: $rootScope.currentUserData.userID}, function(success){
      if(!_.isEmpty(success.interests)){
        $scope.formData.interests = success.interests;
      }
      $scope.formData.like_research_text = success.like_research_text;
      $scope.formData.why_ark_text = success.why_ark_text;
    });

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


      UserService.update({id: $rootScope.currentUserData.userID}, $scope.formData, function(success){
        $scope.updating = false;
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
        $scope.forced = false;
      }, function(error){
        $scope.updating = false;
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 2; // Error
        });
      });



      /*
      smt.$save(user, function() {
        // success
        $scope.updating = false;

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(response){
        // error
        $scope.updating = false;
        $scope.errors = response;
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