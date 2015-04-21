/**
 * Created by sanderaido on 21/04/15.
 */

angular.module("arkofinquiryApp")
  .factory("AuthStorageService", function (LoginService){

    var currentUser = {
      isLoggedIn: false,
      user: {}
    };

    return currentUser;

  });
