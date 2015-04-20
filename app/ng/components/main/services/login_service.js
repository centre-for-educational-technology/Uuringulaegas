/**
 * Created by sanderaido on 17/04/15.
 */

angular.module("arkofinquiryApp")
  .factory("LoginService", function LoginFactory($resource, $http, appConfig){

    var isLoggedIn;
    var currentUser;

    return $resource(appConfig.apiUrl + 'wp-admin/admin-ajax.php', {}, {
      currentUser: function(){
        return currentUser;
      },
      getLoggedInUser: {
        method: 'GET',
        params: {
          action: 'get_logged_in_user'
        },
        interceptor: {
          response: function (data) {
            isLoggedIn = true;
            currentUser = data;
            console.log('response in interceptor', data);
          },
          responseError: function (data) {
            isLoggedIn = false;
            console.log('error in interceptor', data);
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
