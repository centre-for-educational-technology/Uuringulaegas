/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("HelpPageService", function HelpPageFactory($resource, $http, appConfig, $rootScope){

    $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;

    return $resource(appConfig.apiUrl + 'wp-json/pods/page/:id', {}, {
      query: {
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getHelpPages: {
        url: appConfig.apiUrl + 'wp-json/pods/page?data[where]=category.slug="help"',
        keyword: '@keyword',
        methord: 'GET',
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      }
    });

});
