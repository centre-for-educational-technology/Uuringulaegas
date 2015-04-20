/**
 * Created by Sander on 11.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("GroupService", function GroupFactory($resource, $http, appConfig, $rootScope){

  $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;

  return $resource(appConfig.apiUrl + 'wp-json/pods/group/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: [angular.fromJson, function(data, headers){
        return _.values(data); // Removes keys from response
      }]
    }
  });

});
