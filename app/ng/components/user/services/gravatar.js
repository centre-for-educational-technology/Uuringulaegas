// This module depends on the google CryptoJS library

angular.module('Gravatar', [])
  .provider('$gravatar', function() {
    var avatarSize = 150; // Default size
    var avatarUrl = "http://www.gravatar.com/avatar/";
    var defaultImage = "mm";

    this.setSize = function(size) {
      avatarSize = size;
    };

    this.$get = function(){
      return {
        generate: function(email){
          return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString() + "&d=" + defaultImage
        }
      }
    }
  });
