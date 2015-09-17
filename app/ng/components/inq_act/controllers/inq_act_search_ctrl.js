'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivitySearchCtrl
 * @description
 * # InquiryActivitySearchCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivitySearchCtrl', function ($scope, $http, $document, InquiryActivityService, InquiryActivityKeywordService) {

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

    // Create new Activity Service
    $scope.activity = new InquiryActivityService();

    // Function for resetting/emptying form fields
    function resetForm(){
      $scope.formData = {
        phrase: '',
        description: '',
        keywords: [],
        phaseLevels: {
          '1': '0',
          '2': '0',
          '3': '0',
          '4': '0',
          '5': '0'
        },
        extra: {
          location: [],
          location_web: '',
          location_city: '',
          location_address: '',
          domains: [''],
          topic: '',
          languages: [''],
          proficiency_level: [''],
          age_range_from: 7,
          age_range_to: 18,
          learning_time: '',
          materials_needed: '',
          success_evidence: [''],
          evidence_description: '',
          rri_component: 0,
          rri_description: '',
          rights_restrictions: 0,
          rights_description: ''
        }
      };
    }
  });


