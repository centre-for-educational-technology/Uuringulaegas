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
      domains: {
        chemistry: 'Chemistry',
        engineering: 'Engineering',
        biology: 'Biology',
        physics: 'Physics',
        mathematics: 'Mathematics',
        electricity: 'Electricity'
        },
      languages: {
        est: 'Estonian',
        eng: 'English',
        fin: 'Finnish',
        rus: 'Russian'
      },
      levels: {
        1: 'Basic',
        2: 'Advanced',
        3: 'Expert'
      },
      coveredPhases: {
        1: 'Orientation',
        2: 'Conceptualisation',
        3: 'Investigation',
        4: 'Conclusion',
        5: 'Discussion'
      },
      departingPhases: {
        0: '',
        1: 'Orientation',
        2: 'Conceptualisation',
        3: 'Investigation',
        4: 'Conclusion',
        5: 'Discussion'
      },
      successEvidence: {
        1: 'Direct empirical evidence',
        2: 'Indirect empirical evidence',
        3: 'Theoretical evidence',
        4: 'Ecological evidence'
      },
      booleanValues: {
        0: 'No',
        1: 'Yes'
      }
    };

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

      // Adds phase levels to post
      for(var j = 1; j <= 5; j++){
        activity['phase_' + j + '_level'] = parseInt($scope.formData.phaseLevels[j]);
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
      }, function(error){
        // error
        $scope.updating = false;
        $scope.errors = error;
        console.log("ERROR " + error); // -------------------------------------- REMOVE after debugging
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


