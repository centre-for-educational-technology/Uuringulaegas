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

    var currentPage = 1;
    var currentQuery = '';
    var postsPerPage = 15;

    $scope.formOptions = {};
    $scope.formOptions.domains = $rootScope.langStrings.inqAct.domains;
    $scope.formOptions.domains.any = $rootScope.langStrings.inqAct.search.anyString;
    $scope.formOptions.proficiencyLevels = $rootScope.langStrings.inqAct.levels;
    $scope.formOptions.proficiencyLevels.any = $rootScope.langStrings.inqAct.search.anyString;
    $scope.formOptions.languages = $rootScope.langStrings.inqAct.languages;
    $scope.formOptions.languages.any = $rootScope.langStrings.inqAct.search.anyString;
    $scope.loadMoreButtonShown = false;
    $scope.loadMoreButtonDisabled = false;


      _.extend($scope.formOptions, $rootScope.langStrings.inqAct.search.anyString);

    $scope.phaseCheckboxes = {};

    $scope.$watch('phaseCheckboxes', function() {
      for(var i = 1; i <= _.size($scope.phaseCheckboxes); i++){
        if($scope.phaseCheckboxes[i] == false){
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

    $scope.showSearchForm = function(){
      $scope.searchFormHide = false;
    };

    // Handle search
    $scope.searchActivities = function(){
      var query = '';
      //Pagination
      //var page = 2;
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


      query = extendQuery();
      query += 'age_range_from.meta_value>=' + form.age_range.from + ' AND age_range_to.meta_value<=' + form.age_range.to;

      if(isInArray(form.location, 0)){
        query = extendQuery();
        query += 'location.meta_value=0';
      }

      if(isInArray(form.location, 1)){
        query = extendQuery();
        query += 'location.meta_value=1';
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

      if(form.language != 'any'){
        query = extendQuery();
        query += 'languages.meta_value="' + form.language + '"';
      }

      if(form.proficiency_level != 'any'){
        query = extendQuery();
        query += 'proficiency_level.meta_value="' + form.proficiency_level + '"';
      }

      for(var i = 1; i < _.size($scope.formData.phaseLevels) + 1; i++){
        if($scope.formData.phaseLevels[i] > 0){
          query = extendQuery();
          query += 'phase_' + i + '_level.meta_value=' + $scope.formData.phaseLevels[i] + '';
        }
      }

      if(isInArray(form.other, 1)){
        query = extendQuery();
        query += 'learning_time.meta_value BETWEEN ' + form.learning_time.from + ' AND ' + form.learning_time.to;
      }

      if(isInArray(form.other, 2)){
        query = extendQuery();
        query += 'rri_component.meta_value="1"';
      }



      currentQuery = query;
      currentPage = 1;

      InquiryActivityService.fullSearch({query: query, page: currentPage, limit: postsPerPage}, function(response){
        $scope.searchResults = response;
        $scope.searchFormHide = true;
        if(response.length>=postsPerPage){
          $scope.loadMoreButtonShown = true;
        }
      });
    };

    $scope.loadMoreSearchResults = function(){
      var newPage = currentPage+1;
      $scope.loadMoreButtonDisabled = true;
      InquiryActivityService.fullSearch({query: currentQuery, page: newPage, limit: postsPerPage}, function(response){
        currentPage = newPage;
        if(response.length<postsPerPage){
          $scope.loadMoreButtonShown = false;
        }

        $scope.searchResults = $scope.searchResults.concat(response);

        $scope.loadMoreButtonDisabled = false;
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
        language: 'any',
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


