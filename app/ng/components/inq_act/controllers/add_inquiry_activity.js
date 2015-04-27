'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:AddInquiryActivityCtrl
 * @description
 * # AddInquiryActivityCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('AddInquiryActivityCtrl', function ($scope, $http, $document, InquiryActivityService, InquiryActivityKeywordService) {

    // Set up form options
    $scope.formOptions = {
      location: {
        0: 'Web-based',
        1: 'Physical location'
      },
      domains: [
        'Chemistry',
        'Engineering',
        'Biology',
        'Physics',
        'Mathematics',
        'Electricity'
      ],
      languages: [
        'Estonian',
        'English',
        'Finnish',
        'Russian'
      ],
      levels: {
        1: 'Basic',
        2: 'Advanced',
        3: 'Expert'
      },
      coveredPhases: [
        'Orientation',
        'Conceptualisation',
        'Investigation',
        'Conclusion',
        'Discussion'
      ],
      departingPhases: [
        '',
        'Orientation',
        'Conceptualisation',
        'Investigation',
        'Conclusion',
        'Discussion'
      ],
      successEvidence: [
        'Direct empirical evidence',
        'Indirect empirical evidence',
        'Theoretical evidence',
        'Ecological evidence'
      ],
      rightsRestrictions: {
        0: 'No',
        1: 'Yes'
      }
    };

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

    /*
      postingState variable:
      0 - Not yet posted
      1 - Success
      2 - Error
     */
    $scope.postingState = 0; // Not posted

    // Save new Inquiry Activity
    $scope.saveActivity = function(activity){
      $scope.errors = null;
      $scope.updating = true;

      // Set post data that has different keys from form extra data
      activity.post_title = $scope.formData.title;
      activity.post_content = $scope.formData.description;
      activity.post_status = 'publish';
      activity.post_type = 'inq_activity';
      activity.inq_keywords = [];

      for(var i = 0; i < $scope.formData.keywords.length; i++){
        if ($scope.formData.keywords[i].term_id){
          activity.inq_keywords.push($scope.formData.keywords[i].term_id)
        } else {
          activity.inq_keywords.push($scope.formData.keywords[i].name)
        }
      }

      // append form data object to activity object (same keys)
      _.extend(activity, $scope.formData.extra);

      // POST to DP
      activity.$save(activity, function() {
        // success
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 1; // OK
        });
      }, function(activity){
        // error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
        $document.scrollTopAnimated(0).then(function(){
          $scope.postingState = 2; // Error
        });

      });
    };


    // Function for resetting/emptying form fields
    function resetForm(){
      $scope.formData = {
        title: '',
        description: '',
        keywords: [],
        extra: {
          location: [],
          location_web: '',
          location_city: '',
          location_address: '',
          domains: [''],
          topic: '',
          languages: [''],
          proficiency_level: [''],
          covered_phases: [''],
          departing_phases: [''],
          age_range_from: 7,
          age_range_to: 18,
          learning_time: '',
          materials_needed: '',
          success_evidence: [''],
          evidence_description: '',
          rights_restrictions: 0,
          rights_description: ''
        }
      };
    }
  });


