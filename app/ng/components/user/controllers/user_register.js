'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserRegisterCtrl', function ($scope, $http, $document, UserRegisterService) {

    // Set up form options
    $scope.formOptions = {
      languages: [
        'Estonian',
        'English',
        'Finnish',
        'Russian',
        'German'
      ],
      roles: [
          'Learner',
          'Teacher'
      ],
      sex: {
        1: 'Male',
        2: 'Female'
      }
    };

    // Set up DatePicker options and declare methods for it
    $scope.datePickerOptions = {
      startingDay: 1,
      showWeeks: false
    };

    $scope.todayDate = new Date();
    $scope.datePickerMode = 'year';

    $scope.openDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datePickerOpened = true;
    };

    // Set up empty userData object
    resetForm();

    // Create new User Service
    $scope.user = new UserRegisterService();

    /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    // Save new User
    $scope.registerUser = function(user){
      $scope.errors = null;
      $scope.updating = true;

      // Set user data that has different keys from form extra data
      user.user_email = $scope.userData.email;
      user.user_login = $scope.userData.email;
      user.user_pass = $scope.userData.password;
      user.display_name = $scope.userData.extra.full_name;
      user.first_name = $scope.userData.extra.full_name;
      user.user_nicename = $scope.userData.extra.full_name;

      // append from data 'extra' object to userData object (same keys)
      _.extend(user, $scope.userData.extra);

      // POST to DB
      user.$save(user, function() {
        // success
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(user){
        // error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
        resetForm(); // FOR TESTING ONLY
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // Error !! NEEDS TO BE '2' - error
        });
      });
    };


    function resetForm() {
      $scope.userData = {
        email: '',
        password: '',
        extra: {
          full_name: '',
          date_of_birth: '',
          sex: '',
          city_of_residence: '',
          user_type: '0',
          preferred_language: '',
          additional_languages: ['']
        }
      };
    }

  });


