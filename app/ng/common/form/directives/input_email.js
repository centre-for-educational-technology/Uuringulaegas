/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputEmail', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/input_email.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                req: '@',
                indent: '@',
                placeholder: '@',
                helpText: '@'
            }
        }
    });
