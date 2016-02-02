/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formSelect', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/select.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                options: '=',
                req: '@'
            },
          link: function(scope){
            scope.optionsArray = [];
            scope.$watchCollection('options', function(items) {
              scope.optionsArray.length = 0;
              angular.forEach(items, function(value, key) {
                scope.optionsArray.push({ key: key, value: value});
              });
            });
          }
        }
    });
