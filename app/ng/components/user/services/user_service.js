/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("UserService", function UserFactory($resource, $http){
        $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
        return $resource('/api/wp-json/pods/user/:id', {}, {
                query: {
                        method: "GET",
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                        return _.values(data);
                        }]
                },
                filter: {
                        url: "/api/wp-json/pods/user/find?where=full_name%3D:filter",
                        filter: '@filter',
                        method: "GET",
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                                return _.values(data);
                        }]
                }
        });

});