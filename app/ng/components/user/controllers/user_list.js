'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserListCtrl', function ($scope, $http, UserService, $location) {

    $scope.userList = UserService.query();

    $scope.showPassport = function(user){
      $location.path('user/' + user.id)
    };

  });


