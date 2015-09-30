/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputCheckbox', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/input_checkbox.html',
            scope: {
                label: '@',
                name: '=',
                options: '=',
                model: '=',
                req: '@',
              disabled: '@'
            }
            /*link: function(scope){
              for(var i = 0; i < scope.options.length; i++){
                scope.model[i] = false;
              }
            }*/
        }
    });
