/**
 * Created by sanderaido on 08/04/15.
 */


angular.module('arkofinquiryApp')
  .filter('notInArray', function($filter){
    return function(list, arrayFilter, element){
      if(arrayFilter){
        return $filter("filter")(list, function(listItem){
          return arrayFilter.indexOf(listItem[element]) == -1;
        });
      }
    };
  });

