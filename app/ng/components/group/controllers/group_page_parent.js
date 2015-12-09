'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddGroupCtrl
 * @description
 * # AddGroupCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupParentCtrl', function ($scope, $stateParams, GroupService, $rootScope) {

    GroupService.get({id: $stateParams.id}, function(success){
      for(var t = 0; t < success.teachers.length; t++){
        if(parseInt(success.teachers[t].ID) == $rootScope.currentUserData.userID){
          $scope.allowedToEdit = true;
        }
      }
    });


  });
