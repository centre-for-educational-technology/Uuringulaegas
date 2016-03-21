'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupCommentsCtrl
 * @description
 * # GroupCommentsCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserCommentsCtrl', function ($scope, $http, appConfig, UserCommentService, $filter, $gravatar, $stateParams) {


    var userID = $stateParams.id;

    $scope.loadingComments = true;

    $scope.comments = UserCommentService.getUserComments({userID: userID}, function(response){
      for(var i = 0; i < response.length; i++){
        response[i].created = $filter('stringToDate')(response[i].created);
      }
      $scope.loadingComments = false;
    });

    $scope.newComment = {};

    $scope.postComment = function(){
      $scope.updating = true;

      $scope.newComment.user = userID;

      new UserCommentService($scope.newComment).$save($scope.newComment, function(successCallback){
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


