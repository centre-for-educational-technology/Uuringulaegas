"use strict";
/**
 * Created by sanderaido on 08/04/15.
 *
 * Returns only the first paragraph of long text
 *
 */


angular.module('arkofinquiryApp')
  .filter('limitParagraph', function(){

    return function(string){
      if(!string){
        return "";
      }

      var splitArray = string.split("\n");
      var ellipse = (splitArray.length > 1) ? " ..." : "";
      return splitArray[0] + ellipse;
    }
  });
