/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formTextarea', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/textarea.html',
            scope: {
                id: '@',
                label: '@',
                rows: '=',
                model: '=',
                req: '@',
                placeholder: '@'
            }
        }
    });
