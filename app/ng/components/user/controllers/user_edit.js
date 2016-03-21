'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserEditCtrl', function ($rootScope, $scope, $http, $document, $stateParams, UserRegisterService, UserService) {

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

    $scope.closeDatePicker = function(){
      $scope.datePickerOpened = false;
    };

    // Set up empty userData object
    $scope.userData = {
      full_name: '',
      date_of_birth: '',
      sex: '',
      country_of_residence: '',
      city_of_residence: '',
      preferred_language: '',
      additional_languages: ['']
    };

    /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    // Save new User
    $scope.editUser = function(user){
      $scope.errors = null;
      $scope.updating = true;
      $scope.postingState = 0;

      _.extend(user, $scope.userData.extra);

      var postData = _.clone($scope.userData);

      postData.date_of_birth = moment(postData.date_of_birth).add(12, 'h'); // add 12h to bring date to midday to overcome any timezone differences at 00:00

      postData.display_name = postData.full_name;
      postData.first_name = postData.full_name;

      // POST to DB
      UserService.save({
        id: user.id
      }, postData, function(data) {
        $scope.updating = false;
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
        $rootScope.currentUserData.userDisplayName = data.display_name;
      }, function() {
        $scope.updating = false;
        $scope.errors = response;
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 2; // Error
        });
      });
    };

    // Load user data
    UserService.get({id: $rootScope.currentUserData.userID}, function(user){
      $scope.user = user;
      $scope.userData.full_name = user.full_name;
      $scope.userData.date_of_birth = user.date_of_birth;
      $scope.userData.sex = user.sex;
      $scope.userData.country_of_residence = user.country_of_residence;
      $scope.userData.city_of_residence = user.city_of_residence;
      $scope.userData.preferred_language = user.preferred_language;
      $scope.userData.additional_languages = user.additional_languages;
    });

  });
