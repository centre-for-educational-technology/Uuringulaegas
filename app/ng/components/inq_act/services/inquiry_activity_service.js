/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityService", function InquiryActivityFactory($resource, $http, appConfig){
        $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
        return $resource(appConfig.apiUrl + 'wp-json/pods/inq_activity/:id', {}, {});

});
