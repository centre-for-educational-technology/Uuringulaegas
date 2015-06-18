'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('MainCtrl', function ($rootScope, LoginService, $route, $scope) {

    $rootScope.developerView = true; // Set to 'true' to see hidden raw data

    $scope.userLoaded = false;

    $scope.$on('$locationChangeStart', function(event) {
      getLoggedInUser();
    });

    function getLoggedInUser(){
      LoginService.getLoggedInUser('', function(data){
        // Success
        $rootScope.loggedIn = true;
        $rootScope.currentUserData = data;
        $scope.userLoaded = true;
      }, function(error){
        // Error (not logged in)
        $rootScope.loggedIn = false;
        $scope.userLoaded = true;
      });
    }

    $rootScope.langStrings = {
      inqLog: {
        passportStatus: {
          1: 'recommended activity',
          2: 'requested activity',
          3: 'accepted activity',
          4: 'Started activity',
          5: 'Completed activity',
          6: 'reviewed evidence for',
          7: 'graded activity',
          8: 'Received a badge for',
          9: 'Advanced to level'
        },
        groupPageStatus: {
          1: 'recommended activity',
          2: 'requested activity',
          3: 'accepted activity',
          4: 'started activity',
          5: 'completed activity',
          6: 'reviewed evidence for',
          7: 'graded activity',
          8: 'received a badge for',
          9: 'Advanced to level'
        }
      },
      inqAct: {
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
        rightsRestrictions: {
          0: 'No',
          1: 'Yes'
        }
      }
    }

  });
