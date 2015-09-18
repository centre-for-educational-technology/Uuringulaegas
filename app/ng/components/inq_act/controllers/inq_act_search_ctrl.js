'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivitySearchCtrl
 * @description
 * # InquiryActivitySearchCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivitySearchCtrl', function ($scope, $http, $document, InquiryActivityService, InquiryActivityKeywordService, $rootScope) {

    $scope.formOptions = {};

    _.extend($scope.formOptions, $rootScope.langStrings.inqAct.search.anyString);

    $scope.phaseCheckboxes = {};

    $scope.$watch('phaseCheckboxes', function() {
      console.log('changed');
      for(var i = 1; i <= _.size($scope.phaseCheckboxes); i++){
        if($scope.phaseCheckboxes[i] == false){
          console.log('false ' + i);
          $scope.formData.phaseLevels[i] = '0';
        }
      }
    }, true);


    // Expose Underscore.js to scope
    $scope._ = _;


    // Set up empty formData object
    resetForm();

    // Create new User Service
    $scope.loadKeywords = function(query) {
      return InquiryActivityKeywordService.queryKeywordsByName({searchName: query}, function(data){
        return data;
      }).$promise;
    };

    // Handle search

    $scope.searchActivities = function(){
      var query = '';
      var form = $scope.formData;

      function extendQuery(){
        if(query.length > 0){
          query += '%20AND%20'
        }
        return query;
      }

      if(form.phrase.length > 0){
        query += 't.post_title%20LIKE%20%22%25' + form.phrase + '%25%22'
      }
      if(form.location[0]){
        query = extendQuery;
        query += 'location.meta_value = 0'
      }
      //TODO location query

      if(!isInArray(form.domains, 'aaa')){
        query = extendQuery();
        query += '(';
        for(var j = 0; j < form.domains.length; j++){
          query += 'domains.meta_value%3D%22' + form + '%22';
          if ((form.domains.length - j) > 1){
            query += '%20OR%20';
          }
        }
        query += ')';
      }

      InquiryActivityService.fullSearch({query: query}, function(response){
        $scope.searchResults = response;
        console.log(response);
      });
    };

    function isInArray(array, property){
      return _.indexOf(array, property) >= 0;
    }

    // Function for resetting/emptying form fields
    function resetForm(){
      $scope.formData = {
        phrase: '',
        keywords: [],
        location: [],
        domains: [''],
        languages: [''],
        proficiency_level: [''],
        phaseLevels: {
          '1': '0',
          '2': '0',
          '3': '0',
          '4': '0',
          '5': '0'
        },
        other: [],
        age_range: {
          from: 1,
          to: 99
        },
        learning_time: {
          from: 0,
          to: 99
        }
      };
    }
  });


