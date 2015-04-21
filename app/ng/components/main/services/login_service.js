/**
 * Created by sanderaido on 17/04/15.
 */

angular.module("arkofinquiryApp")
  .factory("LoginService", function LoginFactory($resource, $http, appConfig){

    var isLoggedIn;
    var currentUser;

    return $resource(appConfig.apiUrl + 'wp-admin/admin-ajax.php', {}, {
      getLoggedInUser: {
        method: 'GET',
        params: {
          action: 'get_logged_in_user'
        },
        interceptor: {
          response: function (response) {
            isLoggedIn = true;
            currentUser = response.data;
            console.log('response in interceptor', response.data);
            return response.data;
          },
          responseError: function (response) {
            isLoggedIn = false;
            console.log('error in interceptor', response);
            return response.data;
          }
        }
      },
      login: {
        method: 'POST',
        data: {
          action: 'log_in' // not used right now (sent from controller)
        },
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      },
      logout: {
        method: 'POST',
        params: {
          action: 'log_out'
        }
      }
    });

});
