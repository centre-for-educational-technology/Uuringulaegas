"use strict";

/**
 * Created by Sander on 24.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formTagsInput', function(appConfig){
    return {
      replace: true,
      restrict: 'E',
      templateUrl: appConfig.appBase + 'ng/common/form/views/tags_input.html',
      scope: {
        label: '@',
        model: '=',
        placeholder: '@',
        displayProperty: '@',
        autocompleteOnly: '@',
        autocompleteSource: '&'
      },
      link: function(scope, event){
        scope.pasteTags = function(event){
          event.preventDefault();
          var tags = event.originalEvent.clipboardData.getData('text/plain').split(',');
          console.log(_.values(scope.model));

          for(var i = 0; i < tags.length; i++){
            tags[i] = tags[i].trim();
            if(tags[i].length > 0 && _.chain(scope.model).pluck("name").indexOf(tags[i]).value() == -1){
              scope.model.push({'name': tags[i]});
            }
          }
        }
      }
    }
  });
