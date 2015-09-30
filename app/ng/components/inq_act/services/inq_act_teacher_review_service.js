/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("TeacherReviewService", function PeerReviewFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/teacher_review/:id', {}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByLearnerID: {
            url: appConfig.apiUrl + 'wp-json/pods/teacher_review?data[where]=learner.ID%3D:learnerID',
            learnerID: '@learnerID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByLearnerAndActivity: {
            url: appConfig.apiUrl + 'wp-json/pods/teacher_review?data[where]=learner.ID%3D:learnerID%20AND%20inq_activity.ID%3D:activityID',
            learnerID: '@learnerID',
            activityID: '@activityID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          }
        });

});
