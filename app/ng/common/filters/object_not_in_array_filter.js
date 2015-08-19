/**
 * Created by sanderaido on 08/04/15.
 */


angular.module('arkofinquiryApp')
  .filter('objectNotInArray', function(){
    return function( userList, alreadyAddedUsers ) {
      var filtered = [];
      var notFound = true;
      angular.forEach(userList, function(newUser) {
        angular.forEach(alreadyAddedUsers, function(addedUser) {
          if( newUser.id == addedUser.id ) {
            notFound = false;
          }
        });
        if (notFound){
          filtered.push(newUser)
        }
        notFound = true;
      });
      return filtered;
    };
  });

