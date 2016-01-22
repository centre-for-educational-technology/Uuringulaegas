/**
 * Created by sander on 22/01/16.
 */

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
angular.module('arkofinquiryApp')
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
});

