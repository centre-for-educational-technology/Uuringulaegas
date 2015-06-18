/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityStatusService", function InquiryActivityStatusFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/inq_status/:id', {id: '@id'}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByLearnerID: {
            url: appConfig.apiUrl + 'wp-json/pods/inq_status?data[where]=learner.ID%3D:learnerID',
            learnerID: '@learnerID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByTeacherID: {
            url: appConfig.apiUrl + 'wp-json/pods/inq_status?data[where]=teacher.ID%3D:teacherID',
            teacherID: '@teacherID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchCurrentStatus: {
            url: appConfig.apiUrl + 'wp-json/pods/inq_status?data[where]=learner.ID%3D:learnerID%20AND%20inq_activity.ID%3D:inqActID',
            learnerID: '@learnerID',
            inqActId: '@inqActID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          update: {
            method: 'PUT'
          }
        });

});
