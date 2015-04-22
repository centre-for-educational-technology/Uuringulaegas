/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityService", function InquiryActivityFactory($resource, $http, appConfig, $rootScope){

        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/inq_activity/:id', {}, {
          query: {
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          },
          searchByKeyword: {
            url: appConfig.apiUrl + 'wp-json/posts?type=inq_activity&filter[inq_keywords]=:keyword',
            keyword: '@keyword',
            methord: 'GET',
            isArray: true,
            transformResponse: [angular.fromJson, function(data, headers){
              return _.values(data); // Removes keys from response
            }]
          }
        });

});
