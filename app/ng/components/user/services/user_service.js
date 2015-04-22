/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("UserService", function UserFactory($resource, $http, appConfig, $rootScope){
        $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;
        return $resource(appConfig.apiUrl + 'wp-json/pods/user/:id', {}, {
                query: {
                        method: 'GET',
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                          return _.values(data); // Removes keys from response
                        }]
                },
                queryLearnersByName: {
                        url: appConfig.apiUrl + 'wp-json/pods/user?data[where]=(full_name.meta_value%20LIKE%20%22%25:searchName%25%22%20OR%20user_email%20LIKE%20%22%25:searchName%25%22%20)%20AND%20user_type.meta_value%3D0',
                        searchName: '@searchName',
                        method: 'GET',
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                                return _.values(data); // Removes keys from response
                        }]
                }
        });

});
