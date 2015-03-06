'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserRegisterCtrl', function ($scope, $http, UserService) {

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
      ]
    };

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




    $scope.userData = {
      email: '',
      extra: {
        full_name: '',
        date_of_birth: '',
        city_of_residence: '',
        user_type: 'Learner',
        preferred_language: '',
        additional_languages: ['']
      }
    };



    $scope.state = 0;

    $scope.user = new UserService();

    $scope.registerUser = function(user){
      user.user_email = $scope.userData.email;
      user.user_login = $scope.userData.email;
      user.display_name = $scope.userData.extra.full_name;
      user.user_nicename = $scope.userData.extra.full_name;

      _.extend(user, $scope.userData.extra); // add elements from userData extra to userservice object

      $scope.errors = null;
      $scope.updating = true;

      user.$save(user, function() {
        console.log("OK");
        $scope.updating = false;
        $scope.state = 1;
        $scope.userData = {
          email: '',
          extra: {
            full_name: '',
            date_of_birth: '1995-03-16',
            city_of_residence: '',
            user_type: 'Learner',
            preferred_language: '',
            additional_languages: ['']
          }
        };
      }, function(user){
        $scope.state = 2;
        console.log("ERROR");
      });
    };

  });


