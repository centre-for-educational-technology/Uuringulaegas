/**
 * Created by sanderaido on 31/03/15.
 */

angular.module("arkofinquiryApp")
.controller('NavCtrl', function ($scope, $location) {

  $scope.setActiveIfPath = function (path) {
    if ($location.path().substr(0, path.length) == path) {
      if (path == "/" && $location.path() == "/") {
        return "active";
      } else if (path == "/") {
        return "";
      }
      return "active"
    } else {
      return ""
    }
  }
});
