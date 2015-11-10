/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("GroupCommentService", function GroupCommentFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/group_comment/:id', {}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          getGroupComments: {
            url: appConfig.apiUrl + 'wp-json/pods/group_comment?data[where]=group.ID%3D:groupID',
            groupID: '@groupID',
            method: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          }
        });

});
