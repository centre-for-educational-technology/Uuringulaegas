/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("UserRegisterService", function UserFactory($resource, $http, appConfig){

        return $resource(appConfig.apiUrl + 'wp-json/pods/user/:id', {}, {});

});
