"use strict";
/**
 * Created by sanderaido on 08/04/15.
 *
 * Converts dates returned in string format to JS Date objects
 * (parsed with Moment.js)
 *
 */


angular.module('arkofinquiryApp')
  .filter('stringToDate', function(){
    var timeFormat = 'YYYY-MM-DD HH:mm:ss';

    return function(string){
      return new Date(moment(string, timeFormat));
    }
  });
