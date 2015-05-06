/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityLogService", function InquiryActivityLogFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/inq_log/:id', {}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByLearnerID: {
            url: appConfig.apiUrl + 'wp-json/pods/inq_log?data[where]=learner.ID%3D:learnerID',
            learnerID: '@learnerID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          }
        });

});
