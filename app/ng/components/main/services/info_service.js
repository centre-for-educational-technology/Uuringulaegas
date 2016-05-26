/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InfoService", function InfoFactory($resource, $http, appConfig){

    return $resource(appConfig.apiUrl + 'wp-json/pods/page/:id', {}, {
      query: {
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getHelpPages: {
        url: appConfig.apiUrl + 'wp-json/pods/page?data[where]=category.slug="help"',
        method: 'GET',
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getAnnouncement: {
        url: appConfig.apiUrl + 'wp-json/pods/page?data[where]=category.slug="announcement"',
        method: 'GET',
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getReviewGuide: {
        url: appConfig.apiUrl + 'wp-json/pods/page?data[where]=category.slug="review-guide"',
        method: 'GET',
        cache: true,
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getEvidenceGuide: {
        url: appConfig.apiUrl + 'wp-json/pods/page?data[where]=category.slug="evidence-guide"',
        method: 'GET',
        cache: true,
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      getBadgeInfo: {
        url: appConfig.apiUrl + 'wp-admin/admin-ajax.php',
        method: 'GET',
        params: {
          action: 'get_badge_json',
          badgeKey: '@badgeKey'
        },
        isArray: false
      }
    });

});
