'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivityTagCloudCtrl
 * @description
 * # InquiryActivityTagCloudCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivityTagCloudCtrl', function ($scope, $http, InquiryActivityKeywordService, $location) {

    $scope.words = [];

    InquiryActivityKeywordService.query('', function(data){
      // Wait for callback, then populate words array with right parameters
      for(var i = 0; i < data.length; i++){
        var term = data[i];
        var keyword = {};

        keyword.text = term.name;
        keyword.weight = term.count;
        keyword.handlers =  {
          click: function() {
            // Save term properties to handler
            var id = term.id;
            var text = term.name;

            // Handle click callback
            return function() {
              // alert("You selected keyword " + text + " with ID: " + id);
              searchKeyword(text);
            }
          }()
        };
        // Push new keyword object to words array
        $scope.words.push(keyword);
      }
    });

    function searchKeyword(keywordText){
      //$location.path('/inq_act/list').search('keyword', keywordText);
      window.open('/#/inq_act/list?keyword=' + keywordText);
      $scope.$apply(); // Needed (just in case) for Angular to recognize change in path
  }


    // http://localhost:8888/api/wp-json/posts?type=inq_activity&filter[inq_keywords]=Chemistry


  });


