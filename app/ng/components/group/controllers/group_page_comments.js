'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupCommentsCtrl
 * @description
 * # GroupCommentsCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupCommentsCtrl', function ($scope, $http, appConfig, GroupCommentService, $filter, $gravatar, $stateParams) {


    var groupID = $stateParams.id;

    $scope.loadingComments = true;

    $scope.comments = GroupCommentService.getGroupComments({groupID: groupID}, function(response){
      for(var i = 0; i < response.length; i++){
        response[i].created = $filter('stringToDate')(response[i].created);
      }
      $scope.loadingComments = false;
    });

    $scope.newComment = {};

    $scope.postComment = function(){
      $scope.updating = true;

      $scope.newComment.group = groupID;

      new GroupCommentService($scope.newComment).$save($scope.newComment, function(successCallback){
        $scope.updating = false;
        $scope.success = true;
        $scope.comments.push(successCallback);
        $scope.newComment = {};
      }, function(errorCallback){
        $scope.updating = false;
        $scope.error = true;
        $scope.errorReason = errorCallback;
      });
    };


    $scope.gravatarUrl = function(user) {
      return $gravatar.generate(user.user_email);
    };

  });


