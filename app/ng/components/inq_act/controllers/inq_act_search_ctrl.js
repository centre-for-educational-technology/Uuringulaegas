'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivitySearchCtrl
 * @description
 * # InquiryActivitySearchCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivitySearchCtrl', function ($scope, $http, $document, InquiryActivityService, InquiryActivityKeywordService, $rootScope, $location) {

    $scope.formOptions = {};
    $scope.formOptions.domains = $rootScope.langStrings.inqAct.domains;
    $scope.formOptions.domains.any = $rootScope.langStrings.inqAct.search.anyString;
    $scope.formOptions.proficiencyLevels = $rootScope.langStrings.inqAct.levels;
    $scope.formOptions.proficiencyLevels.any = $rootScope.langStrings.inqAct.search.anyString;


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

    $scope.showDetailPage = function(activity){
      $location.path('inq_act/' + activity.id);
    };

    $scope.showSearchForm = function(){
      $scope.searchFormHide = false;
    };

    // Handle search

    $scope.searchActivities = function(){
      var query = '';
      var form = $scope.formData;

      function extendQuery(){
        if(query.length > 0){
          query += ' AND '
        }
        return query;
      }

      if(form.phrase.length > 0){
        query += 't.post_title LIKE "%' + form.phrase + '%"'
      }
      if(form.location[0]){
        query = extendQuery;
        query += 'location.meta_value = 0'
      }
      //TODO location query

      if(!isInArray(form.domains, 'any')){
        query = extendQuery();
        query += '(';
        for(var j = 0; j < form.domains.length; j++){
          query += 'domains.meta_value="' + form.domains[j] + '"';
          if ((form.domains.length - j) > 1){
            query += ' OR ';
          }
        }
        query += ')';
      }

      if(form.proficiency_level != 'any'){
        query = extendQuery();
        query += 'proficiency_level.meta_value="' + form.proficiency_level + '"';
      }

      console.log(query);

      InquiryActivityService.fullSearch({query: query}, function(response){
        $scope.searchResults = response;
        $scope.searchFormHide = true;
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
        domains: ['any'],
        languages: [''],
        proficiency_level: 'any',
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


