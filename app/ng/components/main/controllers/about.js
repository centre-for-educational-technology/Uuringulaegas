'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('AboutCtrl', function ($scope, $http) {

    //$http.get('http://localhost:8888/api/wp-json/posts')
    //  .success(function(data, status, headers, config){
    //    $scope.testContent = data;
    //    window.alert("Success! " + status);
    //  })
    //  .error(function(data, status, headers, config){
    //    window.alert("Error getting JSON data from WP " + data + headers + config);
    //  });

    $http.get('/ark/api/wp-json/posts?type[]=inquiry_activities')
      .success(function(data, status, headers, config){
        $scope.testContent = data;
        window.alert("Success! " + status);
      })
      .error(function(data, status, headers, config){
        window.alert("Error getting JSON data from WP " + status);
      });



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


