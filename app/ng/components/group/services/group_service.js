/**
 * Created by Sander on 11.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("GroupService", function GroupFactory($resource, $http, appConfig){
        $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
        return $resource(appConfig.baseUrl + 'api/wp-json/pods/group/:id', {}, {});

});
