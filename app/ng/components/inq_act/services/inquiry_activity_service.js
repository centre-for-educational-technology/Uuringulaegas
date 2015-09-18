/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityService", function InquiryActivityFactory($resource, $http, appConfig, $rootScope){

    var enforceArray = function(obj, keys) {
      angular.forEach(keys, function(key) {
        var tmpVal = obj[key];
        if (tmpVal && !_.isArray(tmpVal) ) {
          obj[key] = [tmpVal];
        }
      });
    };

    var enforcedKeys = [
      'domains',
      'languages',
      'covered_phases',
      'departing_phases',
      'success_evidence'
    ];

    $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;

    return $resource(appConfig.apiUrl + 'wp-json/pods/inq_activity/:id', {}, {
      get: {
        transformResponse: [angular.fromJson, function(data, headers){
          enforceArray(data, enforcedKeys);
          return data;
        }]
      },
      query: {
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          var withoutKeys = _.values(data); // Removes keys from response objects
          enforceArray(withoutKeys, enforcedKeys);
          return withoutKeys;
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
      },
      searchByName: {
        url: appConfig.apiUrl + 'wp-json/pods/inq_activity?data[where]=(t.post_title%20LIKE%20%22%25:searchName%25%22)',
        searchName: '@searchName',
        method: 'GET',
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      },
      fullSearch: {
        url: appConfig.apiUrl + 'wp-json/pods/inq_activity?data[where]=(:query)',
        query: '@query',
        method: 'GET',
        isArray: true,
        transformResponse: [angular.fromJson, function(data, headers){
          return _.values(data); // Removes keys from response
        }]
      }
    });

});
