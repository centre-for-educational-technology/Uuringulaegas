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

      user.date_of_birth = moment(user.date_of_birth).add(12, 'h'); // add 12h to bring date to midday to overcome any timezone differences at 00:00

      // POST to DB
      user.$save(user, function() {
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
          country_of_residence: '',
          city_of_residence: '',
          preferred_language: '',
          additional_languages: ['']
        }
      };
    }

  });


