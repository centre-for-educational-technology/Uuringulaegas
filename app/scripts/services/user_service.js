/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("UserService", function UserFactory($resource, $http){
        $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
        return $resource('/api/wp-json/pods/user/:id', {}, {});

});