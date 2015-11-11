/**
 * Created by Sander on 10.11.2015.
 */

angular.module("arkofinquiryApp")
.factory("UserCommentService", function UserCommentFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/user_comment/:id', {}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          getUserComments: {
            url: appConfig.apiUrl + 'wp-json/pods/user_comment?data[where]=user.ID%3D:userID',
            userID: '@userID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          }
        });

});
